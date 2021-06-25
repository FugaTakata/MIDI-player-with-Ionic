import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import { Midi } from "@tonejs/midi";
import ReactAudioPlayer from "react-audio-player";
import Base64Downloader from "react-base64-downloader";
import * as fs from "fs";
const Home = () => {
  const midiRef = useRef(null);
  const [midi, setMidi] = useState(null);
  const [url, setUrl] = useState(null);

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      const midiData = e.target.result;
      if (midiData) {
        const midi = new Midi(midiData);
        console.log(midi);
        setMidi(midi);
      }
    };
    reader.onerror = (e) => {
      console.error(e);
    };
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    // const midiData = parseFile(file);
    // console.log(midiData);
    // const midi = new Midi(midiData);
    setMidi(midi);

    // midi.tracks.forEach((track) => {
    //   //tracks have notes and controlChanges

    //   //notes are an array
    //   const notes = track.notes;
    //   notes.forEach((note) => {
    //     //note.midi, note.time, note.duration, note.name
    //   });

    //   //the control changes are an object
    //   //the keys are the CC number
    //   track.controlChanges[64];
    //   //they are also aliased to the CC number's common name (if it has one)
    //   track.controlChanges.sustain.forEach((cc) => {
    //     // cc.ticks, cc.value, cc.time
    //   });

    //   //the track also has a channel and instrument
    //   //track.instrument.name
    // });
  };

  const handleClick = () => {
    Tone.start();
    const synths = [];
    const now = Tone.now() + 0.5;
    midi.tracks.forEach((track) => {
      console.log(track.instrument.name, track.instrument.number);
      // if (track.instrument.family === "piano") {
      //create a synth for each track
      const synth = new Tone.PolySynth(Tone.Synth, {
        envelope: {
          attack: 0.02,
          decay: 0.1,
          sustain: 0.3,
          release: 1,
        },
      }).toDestination();
      synths.push(synth);
      //schedule all of the events
      track.notes.forEach((note) => {
        // console.log(note);
        synth.triggerAttackRelease(
          note.name,
          note.duration,
          note.time + now,
          note.velocity
        );
      });
      // }
    });
  };

  useEffect(() => {
    (async () => {
      // const res = await fetch("/furusato.mid");
      const res = await fetch("/Air_on_the_G_String.mp3");
      const reader = new FileReader();
      const b = await res.blob();
      reader.readAsDataURL(b);
      // reader.readAsArrayBuffer(b);
      reader.onload = (e) => {
        const midiData = e.target.result;
        if (midiData) {
          // const midi = new Midi(midiData);
          console.log(midiData);
          setMidi(midiData);
          setUrl(URL.createObjectURL(toBlob(midiData)));
        }
      };
      reader.onerror = (e) => {
        console.error(e);
      };
      // const data = await res.json();
      // const binary_string = window.atob(data.data);
      // const len = binary_string.length;
      // const bytes = new Uint8Array(len);
      // for (let i = 0; i < len; i++) {
      //   bytes[i] = binary_string.charCodeAt(i);
      // }
      // setMidi(data.data);
      // console.log(await res.json());
      // const res = await fetch("/Air_on_the_G_String.mp3");
      // const arrayBuffer = await res.arrayBuffer();
      // const audioBuffer = await audioContext.current.decodeAudioData(arrayBuffer);
      // console.log(audioBuffer);
      // setAudioBuffer(audioBuffer);
    })();
  }, []);
  function toBlob(base64) {
    var bin = atob(base64.replace(/^.*,/, ""));
    var buffer = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) {
      buffer[i] = bin.charCodeAt(i);
    }
    // Blobを作成
    try {
      var blob = new Blob([buffer.buffer], {
        type: "audio/midi",
      });
    } catch (e) {
      return false;
    }
    return blob;
  }
  // useEffect(() => {
  //   (async () => {
  //     const res = await fetch("/furusato.json");
  //     const data = await res.json();

  //     setMidi(data);
  //   })();
  // }, []);

  // useEffect(() => {
  //   if (!midi) {
  //     return;
  //   }
  //   const synths = [];
  //   const now = Tone.now() + 0.5;
  //   midi.tracks.forEach((track) => {
  //     //create a synth for each track
  //     const synth = new Tone.PolySynth(Tone.Synth, {
  //       envelope: {
  //         attack: 0.02,
  //         decay: 0.1,
  //         sustain: 0.3,
  //         release: 1,
  //       },
  //     }).toDestination();
  //     synths.push(synth);
  //     //schedule all of the events
  //     track.notes.forEach((note) => {
  //       console.log(note);
  //       synth.triggerAttackRelease(
  //         note.name,
  //         note.duration,
  //         note.time + now,
  //         note.velocity
  //       );
  //     });
  //   });
  //   // const player = new Tone.Player(midi).toDestination();
  //   // player.autostart = true;
  // }, [midi]);

  // useEffect(() => {
  //   if (!midi) {
  //     return;
  //   }
  //   const synths = [];
  //   const now = Tone.now() + 0.5;
  //   midi.tracks.forEach((track) => {
  //     console.log(track.instrument.name, track.instrument.number);
  //     // if (track.instrument.family === "piano") {
  //     //create a synth for each track
  //     const synth = new Tone.PolySynth(Tone.Synth, {
  //       envelope: {
  //         attack: 0.02,
  //         decay: 0.1,
  //         sustain: 0.3,
  //         release: 1,
  //       },
  //     }).toDestination();
  //     synths.push(synth);
  //     //schedule all of the events
  //     track.notes.forEach((note) => {
  //       // console.log(note);
  //       synth.triggerAttackRelease(
  //         note.name,
  //         note.duration,
  //         note.time + now,
  //         note.velocity
  //       );
  //     });
  //     // }
  //   });
  //   console.log(synths);
  // }, [midi]);

  console.log(midi);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem lines="none">
          <IonLabel position="stacked">MIDIを選択</IonLabel>
          <input
            type="file"
            accept="audio/midi, audio/x-midi"
            onChange={handleChangeFile}
          />
        </IonItem>
        <IonButton onClick={handleClick}>再生</IonButton>
        <ReactAudioPlayer src={midi} autoPlay controls />
        {/* <Base64Downloader base64={midi} downloadName="1x1_red_pixel">
          Click to download
        </Base64Downloader> */}
        <IonButton
          onClick={() => {
            fs.writeFileSync(
              "file.ogg",
              Buffer.from(
                midi.replace("data:audio/ogg; codecs=opus;base64,", ""),
                "base64"
              )
            );
          }}
        >
          fu
        </IonButton>
        <a id="link4" download="hello.mid" href={url} target="_blank">
          Blob URLs(JSON)
        </a>
      </IonContent>
    </IonPage>
  );
};

export default Home;
