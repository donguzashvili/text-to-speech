export default class TextCutter {
  constructor() {
    this.text = "";
    this.onresult = null;
  }

  async authToServer() {
    try {
      const response = await fetch("https://enagramm.com/API/Account/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: "levan.lashauri1@gmail.com",
          Password: "Demo_1234",
        }),
      });
      if (!(await response.ok)) throw new Error("Failed to connect to server");
      const data = await response.json();
      localStorage.setItem("AccessToken", data.AccessToken);
      localStorage.setItem("RefreshToken", data.RefreshToken);
    } catch (err) {
      console.log(err);
    }
  }

  async refreshToken() {
    try {
      const response = await fetch("https://enagramm.com/API/Account/RefreshToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          AccessToken: localStorage.getItem("AccessToken"),
          RefreshToken: localStorage.getItem("RefreshToken"),
        }),
      });

      const data = await response.json();
      localStorage.setItem("AccessToken", data.AccessToken);
      localStorage.setItem("RefreshToken", data.RefreshToken);
    } catch (err) {
      console.log(err);
    }
  }

  async sendToBackend(data) {
    try {
      const model = { Language: "ka", Text: data, Voice: 0, IterationCount: 2 };
      const response = await fetch("https://enagramm.com/API/TTS/SynthesizeTextAudioPath", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        },
        async: true,
        dataType: "json",
        body: JSON.stringify(model),
      });

      if (!response.ok) {
        if (response.status === 401) {
          if (localStorage.getItem("AccessToken")) await this.authToServer();
          else await this.refreshToken();
          this.start();
        }
        throw new Error("Failed to send data to the backend.");
      }

      const result = await response.json();

      if (this.onresult) {
        this.onresult(result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async start() {
    if (!this.text) {
      console.log("No text assigned.");
      return;
    }

    const maxLength = 150;
    const breakPoint = 230;

    let remainingText = this.text;
    let cutIndex = breakPoint;

    while (remainingText.length > 0) {
      if (remainingText.length <= maxLength) {
        if (this.onresult) {
          this.onresult(remainingText);
        }
        await this.sendToBackend(remainingText);
        break;
      }

      let cutText = remainingText.slice(0, cutIndex);

      const punctuationOrder = [". ", "! ", "? ", "; ", ", ", " "];
      let lastPunctuationIndex = -1;
      let selectedPriority = "";

      for (const priority of punctuationOrder) {
        lastPunctuationIndex = cutText.lastIndexOf(priority);
        if (lastPunctuationIndex !== -1) {
          selectedPriority = priority;
          break;
        }
      }

      if (lastPunctuationIndex >= 0) {
        cutIndex = lastPunctuationIndex + selectedPriority.length;
        cutText = remainingText.slice(0, cutIndex).trim();
      }

      if (this.onresult) {
        this.onresult(cutText);
      }
      await this.sendToBackend(cutText);

      remainingText = remainingText.slice(cutIndex).trim();
      cutIndex = breakPoint;
    }
  }
}
