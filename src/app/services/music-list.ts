export interface Song {
  path: string;
  displayName: string;
}

export class MusicList {
  static songs: Song[] = [
    {
      path: 'assets/Music/ChossBoss.wav',
      displayName: 'Social Interaction',
    },
    {
      path: 'assets/Music/Jam.wav',
      displayName: "Nexus Blitzin'",
    },
    {
      path: 'assets/Music/slow.wav',
      displayName: 'Alone on Your Birthday',
    },
    {
      path: 'assets/Music/choss.wav',
      displayName: 'The Chess Grandmaster',
    },
  ];
}
