import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet } from 'react-native';

import {fontSizes, spacing} from '../utils/sizes'
import {colors} from '../utils/colors'

const minutestoMillis = (min) => min*1000*60;
const formatTime = (time) => time < 10 ? `0${time}` : time;

export const CountDown = ({
  minutes = 0.1,
  isPaused,
  onProgress, 
  onEnd
}) => {
  const interval = React.useRef(null);
  const [millis, setMillis] = useState(minutestoMillis(minutes));
  const minute = Math.floor(millis/1000/60) % 60;
  const seconds = Math.floor(millis/1000) % 60;

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        // onEnd();
        return time;
      }
      const timeLeft = time - 1000;
      // onProgress(timeLeft / minutestoMillis(minutes));
      return timeLeft;
    })
  }

  useEffect(() => {
    setMillis(minutestoMillis(minutes))
  }, [minutes])

  useEffect(() => {
    console.log(millis)
    console.log(minutestoMillis(minutes))

    onProgress(millis / minutestoMillis(minutes));
    if (millis === 0) {
      onEnd();
    }
  },[millis])

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval);
      return;
    }
    interval.current = setInterval(countDown, 1000)

    return () => clearInterval(interval.current)
  }, [isPaused])

  return (
    <Text style = {styles.text}>{formatTime(minute)}:{formatTime(seconds)}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
    padding: spacing.lg,
   
  }
})