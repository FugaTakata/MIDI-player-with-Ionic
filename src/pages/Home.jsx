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

const Home = () => {
  const midiRef = useRef(null);
  const [midi, setMidi] = useState(null);

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
      </IonContent>
    </IonPage>
  );
};

export default Home;
