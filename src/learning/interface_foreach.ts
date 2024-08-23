// code for https://www.learningtypescript.com/interfaces/playlist-soundness/
// 在ts中interface与type object类型十分相似, 功能几乎互通, 可以优先使用interface

export interface Song {
    artist: string | Array<string>;
    length: number;
    name: string;
    type: "song";
}

export interface Album {
    type: "album";
    songs: Array<Song>;
}

export interface PlayList {
    type: "playlist";
    resolve(): Array<Song>;
}

export type Disc = Song | Album | PlayList;  // interface的或必须定义成新的type, 而不能extends

export interface ArtistSong {
    [i:string]: Array<string>;
}

export interface GroupPlayList {
    artists: ArtistSong;
    songs: Array<string>;
    time: number;
}

export function unrollPlaylist(items: Disc[]): GroupPlayList {
    // 函数内的成员变量类型, 可以直接被非纯函数extractSong修改
    let groupPlaylist: GroupPlayList = {
        artists: {},
        songs: [],
        time: 0
    };

    const extractSong = function(song: Song) {
        let artist: string[];
        if (typeof song.artist === "string") {
            artist = [song.artist];
        } else {
            artist = song.artist;
        }
        // handle artists
        for (const artistName of artist) {
            if (artistName in groupPlaylist.artists) {
                groupPlaylist.artists[artistName].push(song.name);
            } else {
                groupPlaylist.artists[artistName] = [song.name];
            }
        }
        
        groupPlaylist.songs.push(song.name);
        groupPlaylist.time += song.length;
    }
    
    // 被这个for坑了, 原文没有特别说明输入是disc数组, 一直以为是disc
    for (const item of items) {
        switch (item.type) {
                case "song":
                    extractSong(item);
                    break;
                case "album":
                    item.songs.forEach(extractSong);
                    break;
                case "playlist":
                    item.resolve().forEach(extractSong);
                    break;
            }
    }

    return groupPlaylist;

}
