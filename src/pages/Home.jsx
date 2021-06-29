import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardHeader,
} from "@ionic/react";
import { useState } from "react";

import ReactAudioPlayer from "react-audio-player";

const API_ENDPOINT = "http://127.0.0.1:8888/";

const Home = () => {
  const [url, setUrl] = useState(null);
  const [mp3, setMp3] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target.midi.files[0];

    if (!file) {
      alert("ファイルを入力してください");
      return;
    }

    const formData = new FormData();
    formData.append("midi", file);

    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      body: formData,
    });

    // console.log("response status code", res.status);

    const blob = await res.blob();
    const reader = new FileReader();

    // base64 encode
    reader.readAsDataURL(blob);
    reader.onload = (e) => {
      const mp3Data = e.target.result;
      if (mp3Data) {
        setMp3(mp3Data);
        setUrl(URL.createObjectURL(blob));
      }
    };
    reader.onerror = (err) => {
      console.error(err);
    };
  };

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
            <IonTitle size="large">MIDI</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>入力</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <form onSubmit={handleSubmit}>
              <IonItem lines="none">
                <IonLabel position="stacked">MIDIファイルを選択</IonLabel>
                <IonInput
                  name="midi"
                  type="file"
                  accept="audio/midi, audio/x-midi"
                />
              </IonItem>
              <IonButton type="submit">送信</IonButton>
            </form>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>再生</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <ReactAudioPlayer src={mp3} controls />
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>出力</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel position="stacked">ファイル名を入力</IonLabel>
              <IonInput
                onIonChange={(e) => setFileName(e.target.value)}
                value={fileName}
              />
            </IonItem>
            <IonButton
              disabled={!fileName}
              download={
                (fileName.replaceAll(".", "")
                  ? fileName.replaceAll(".", "")
                  : "zettai-onkan") + ".mp3"
              }
              href={url}
            >
              ダウンロード
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
