import type { NavigationData } from "@/types";

/**
 * Navbar + settings data hook.
 *
 * Nav links and site settings are server-rendered into `initial` and change
 * very rarely, so there's no client polling — that would fire an Edge Request +
 * dynamic function invocation per interval, per open tab, for near-static data.
 * The data refreshes on the next full navigation/load instead.
 */
export function useNavbarData(initial: NavigationData) {
  return { data: initial, error: undefined };
}
