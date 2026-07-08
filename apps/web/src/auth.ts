import { client } from "@workspace/sanity/client";
import { queryAuthorByGoogleId } from "@workspace/sanity/query";
import { writeClient } from "@workspace/sanity/write-client";
import NextAuth, { type NextAuthResult } from "next-auth";
import Google from "next-auth/providers/google";

type GoogleProfile = {
  sub: string;
  name?: string | null;
  email?: string | null;
  picture?: string | null;
};

function getUsername(email?: string | null, name?: string | null) {
  if (email) {
    return email.split("@")[0] ?? email;
  }

  return name?.trim().toLowerCase().replace(/\s+/g, "-") ?? "user";
}

async function uploadGoogleAvatar(avatarUrl: string, username: string) {
  const res = await fetch(avatarUrl);
  if (!res.ok) return undefined;
  const buffer = Buffer.from(await res.arrayBuffer());
  const asset = await writeClient.assets.upload("image", buffer, {
    filename: `${username}-avatar.png`,
    contentType: "image/png",
  });
  return {
    _type: "image" as const,
    asset: { _type: "reference" as const, _ref: asset._id },
  };
}

const nextAuth: NextAuthResult = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user: { name, email, image }, profile }) {
      if (!profile) {
        return false;
      }

      const googleProfile = profile as GoogleProfile;
      const googleId = googleProfile.sub;
      const username = getUsername(email, name);
      const avatarUrl = image || googleProfile.picture || undefined;

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(queryAuthorByGoogleId, { id: googleId });

      if (!existingUser) {
        const imageField = avatarUrl
          ? await uploadGoogleAvatar(avatarUrl, username)
          : undefined;

        await writeClient.create({
          _type: "author",
          googleId,
          name: name || username,
          username,
          email: email || "",
          bio: "",
          ...(imageField && { image: imageField }),
        });
      } else if (!existingUser.image && avatarUrl) {
        const imageField = await uploadGoogleAvatar(avatarUrl, username);
        if (imageField) {
          await writeClient
            .patch(existingUser._id)
            .set({ image: imageField })
            .commit();
        }
      }

      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(queryAuthorByGoogleId, {
            id: (profile as GoogleProfile).sub,
          });

        token.id = user?._id;
      }

      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});

export const handlers: NextAuthResult["handlers"] = nextAuth.handlers;
export const auth: NextAuthResult["auth"] = nextAuth.auth;
export const signIn: NextAuthResult["signIn"] = nextAuth.signIn;
export const signOut: NextAuthResult["signOut"] = nextAuth.signOut;
