import { getAccessToken } from "@/lib/spotify";
import { CurrentlyListeningTo, Player } from "./svgs";

interface FormattedSpotifyData {
  albumImage: string;
  artists: string;
  isEpisode: boolean;
  isExplicit: boolean;
  isPlaying: boolean;
  spotifyUrl: string;
  trackName: string;
}

const formatSpotifyData = (
  data: SpotifyApi.CurrentlyPlayingObject,
): FormattedSpotifyData | null => {
  if (!data.item) return null;
  let { currently_playing_type, item } = (data as any) || {};
  const isEpisode = currently_playing_type === "episode";

  return {
    albumImage: isEpisode ? item.images[1].url : item.album.images[1].url,
    artists: isEpisode
      ? item.show.publisher
      : item.artists.map((artist: any) => artist.name).join(", "),
    isEpisode,
    isExplicit: item.explicit,
    isPlaying: data.is_playing,
    spotifyUrl: item.external_urls.spotify,
    trackName: item.name,
  };
};

const fetchSpotifyData = async (
  accessToken?: string,
  fetchEpisodes?: boolean,
) => {
  let data = null;
  const url = new URL("https://api.spotify.com/v1/me/player/currently-playing");

  url.searchParams.append("market", "NO");
  if (fetchEpisodes) {
    url.searchParams.append("type", "episode");
  }

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (res.ok && res.status === 200) {
      data = await res.json();
    }
    // If the user is listening to an episode, fetch the data again, but this time with type=episode
    if (data?.currently_playing_type === "episode" && !data.item) {
      fetchSpotifyData(accessToken, true);
    }
  } catch (err) {
    console.error(err);
  }

  if (data) {
    const formattedData = formatSpotifyData(data);
    return formattedData;
  }
};

export const SpotifySection = async () => {
  const { access_token } = await getAccessToken();
  const spotifyData = await fetchSpotifyData(access_token);

  if (!spotifyData) return null;
  const { albumImage, artists, spotifyUrl, trackName } = spotifyData || {};

  return (
    <section className="rounded-lg border border-fg/10 p-6">
      <a
        href={spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-8 sm:flex-row"
      >
        <figure className="relative grid size-[120px] shrink-0 place-items-center">
          <img
            src={albumImage}
            alt={`Album art for: ${trackName}`}
            className="aspect-square animate-spin rounded-full object-cover"
          />
          <span className="absolute size-4 rounded-full bg-bg" />
          <div className="absolute">
            <Player />
          </div>
        </figure>

        <div className="w-full overflow-hidden font-mono">
          <div className="flex">
            <CurrentlyListeningTo />
          </div>
          <p className="text-lg">{trackName}</p>
          <p className="mt-1 truncate text-base text-fg/60 italic">{artists}</p>
        </div>
      </a>
    </section>
  );
};
