Virtualizer = React.createClass({
  componentDidMount() {

    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    var audioContext = new AudioContext();
    var audioInput = null,
      realAudioInput = null,
      inputPoint = null,
      audioRecorder = null;
    var rafID = null;
    var analyserContext = null;
    var canvasWidth,
      canvasHeight;
    var recIndex = 0;
    var DOMelement = document.getElementById("virtualizer")

      var canvasWidth,
        canvasHeight;
      function cancelAnalyserUpdates() {
        window.cancelAnimationFrame(rafID);
        rafID = null;
      }

      function updateAnalysers(time) {
        if (!analyserContext) {
          var canvas = DOMelement;
          canvasWidth = canvas.width;
          canvasHeight = canvas.height;
          analyserContext = canvas.getContext('2d');
        }

        // analyzer draw code here
        {
          var SPACING = 5;
          var BAR_WIDTH = 1;
          var numBars = Math.round(canvasWidth / SPACING);
          var freqByteData = new Uint8Array(analyserNode.frequencyBinCount);

          analyserNode.getByteFrequencyData(freqByteData);

          analyserContext.clearRect(0, 0, canvasWidth, canvasHeight);
          analyserContext.fillStyle = 'white';

          var multiplier = analyserNode.frequencyBinCount / numBars / 5;

          // Draw rectangle for each frequency bin.
          for (var i = 0; i < numBars; ++i) {
            var magnitude = 0;
            var offset = Math.floor(i * multiplier);
            // gotta sum/average the block, or we miss narrow-bandwidth spikes
            for (var j = 0; j < multiplier; j++)
              magnitude += freqByteData[offset + j];
            magnitude = magnitude / multiplier;
            var magnitude2 = freqByteData[i * multiplier];
            analyserContext.fillStyle = "hsl( 	white, 100%, 50%)";
            analyserContext.fillRect(i * SPACING, canvasHeight, BAR_WIDTH, -magnitude / 2);
          }
        }

        rafID = window.requestAnimationFrame(updateAnalysers);
      }
      function gotStream(stream) {
        inputPoint = audioContext.createGain();

        // Create an AudioNode from the stream.
        realAudioInput = audioContext.createMediaStreamSource(stream);
        audioInput = realAudioInput;
        audioInput.connect(inputPoint);
        ms1 = stream;
        //    audioInput = convertToMono( input );

        analyserNode = audioContext.createAnalyser();
        analyserNode.fftSize = 2048;
        inputPoint.connect(analyserNode);

        //audioRecorder = new Recorder( inputPoint );

        zeroGain = audioContext.createGain();
        zeroGain.gain.value = 0.0;
        inputPoint.connect(zeroGain);
        zeroGain.connect(audioContext.destination);
        updateAnalysers();
      }
      function initAudio() {
        if (!navigator.cancelAnimationFrame)
          navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
        if (!navigator.requestAnimationFrame)
          navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

        }
      OnlineTuner.getUserMedia({
        "audio": {
          "mandatory": {
            "echoCancellation": "false"
          },
          "optional": []
        }
      }, gotStream, function(e) {
        alert('Error getting audio');
        console.log(e);
      });
      initAudio();

    },
    componentWillUnmount() {
      try {
        ms1.getTracks()[0].stop();

      } catch (e) {
        console.log(e);
      }

    },
    render() {
      return (
        <div id="grad1">
          <canvas id="virtualizer"></canvas>
        </div>

      );
    }
  })
