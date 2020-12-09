# DMXProjectorTool
 Super hacky 'tool' that listens for E131, rebroadcasts over a websocket in order to play a video.

 My primary use is to trigger the playing of a video from [xLights](https://github.com/smeighan/xLights).

### Caveats
- Only supports a single video per instance
- Interaction required on startup in order to get the video into full screen
- Doesn't keep track of video progress, e.g. starting a show at 1 minute in will not make your video start 1 minute in

### Alternatives
I made this tool because none of the alternatives met my needs or were simply way too complicated to setup/had very little information

xSchedule has a 'virtual matrix' [here](https://www.youtube.com/watch?v=sKq4-vhdtNQ)

FPP may have something similar.

### Setup
1. Clone the repository
2. ``npm install`` in the directory to grab the required modules
3. ``node index.js`` to start
4. Place your video file as ``video.mp4`` in a folder called `videos`
5. Head to ``localhost:8080`` in your browser, you can change the port in config.json if needed. Make the video fullscreen.

### xLights Setup
Using xLights 2019.65, instructions may differ in more recent versions.
1. In the Setup view, click **Add E1.31**
2. Configure the controller to have 1 universe and 1 channel. Select unicast and provide the IP address of the device that is running the server:
![](https://i.imgur.com/bB5mg73.png)

3. In the layout tab, drag a DMX model onto the display. Size etc. doesn't matter. Set ``# Channels`` to 1 and then for the Start Channel, open up the menu and then select the controller you created previously
![](https://i.imgur.com/gnCYouh.png)

4. In the sequencer, drag a DMX effect onto the object created in the layout tab. Set Channel1 to 1

Now, whenever the DMX effect is active with Channel1 set to 1, the video will play. If the effect is not active, the video stops and goes back to the start. This means that if you want to have separate videos, you will need to edit them together to have a black screen in between them for the desired time and use just one DMX effect.
