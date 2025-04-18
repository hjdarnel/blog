---
title: 'Scheduled jobs on macOS with launchd'
date: '2025-04-18'
spoiler: How to run a script on a schedule, even through sleep mode
---

I recently started working in a hybrid role again, where I work two or three days in-office. For the first time in years, I found myself to be the guy with his laptop sound on when in the workplace.

Of course I have most notification sounds turned off, but every now and then a noise will play unexpectedly. It only took this happening twice before I wanted to automatically mute my laptop every morning. Here's how I set a script to launch

---

## Launchd

Wikipedia defines `launchd` as "a unified, open-source service management framework for starting, stopping and managing daemons, applications, processes, and scripts. Written and designed by Dave Zarzycki at Apple, it was introduced with Mac OS X Tiger and is licensed under the Apache License."

`launchd` is a way to schedule or background jobs/scripts/daemons. `launchctl` is how we can interact with it on the CLI. You control `launchd` by writing `.plist` files.

A notable difference in scheduling jobs with `launchd` vs `cron` is that `launchd` jobs scheduled with `StartCalendarInterval` will run when the computer comes out of sleep. This means we can schedule jobs and actually expect them to run, even on a laptop which is closed for half its life.

## How to

Below is my `launched.launched_mute_speaker_daily.plist`. By default, the `<StartCalendarInterval>` uses your local system timezone. I have it run a simple AppleScript every morning at 7AM.

Put this file in `~/Library/LaunchAgents` and run `launchctl load ~/Library/LaunchAgents/launched.launched_mute_speaker_daily.plist` to initialize the job.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Label</key>
    <string>launched.launched_mute_speaker_daily</string>
    <key>ProgramArguments</key>
    <array>
      <string>sh</string>
      <string>-c</string>
      <string>osascript -e &#34;set volume with output muted&#34;</string>
    </array>
    <key>StartCalendarInterval</key>
    <array>
      <dict>
        <key>Hour</key>
        <integer>7</integer>
        <key>Minute</key>
        <integer>0</integer>
      </dict>
    </array>
  </dict>
</plist>
```

To make changes to the job, you have to `launchctl unload ~/Library/LaunchAgents/launched.launched_mute_speaker_daily.plist` and `launchctl load ~/Library/LaunchAgents/launched.launched_mute_speaker_daily.plist` again for the changes to be reflected.

## Generating a plist another way

Instead of blindly using my plist and adapting it as needed, you may want to write your own and use one of the many plist parameters.

While researching I came across this [cool tool for generating plists](https://launched.zerowidth.com/). You may find it helpful as well!