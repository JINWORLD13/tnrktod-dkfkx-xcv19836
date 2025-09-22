import { useRef, useEffect } from 'react';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
const isNative = Capacitor.isNativePlatform();
const useSaveTextFile = (text, questionInfo, downloadLinkRef) => {
  useEffect(() => {
    if (!isNative) {
      const textContent = text;
      const currentDate = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      const formattedDate = formatter.format(currentDate);
      const date = formattedDate.split(',')[0].split('/').reverse().join('-');
      const time = formattedDate.split(',')[1].split(':').join('');
      const rearrangedDate = date + ' ' + time;
      const filename = `${rearrangedDate + ' ' + questionInfo?.question}.txt`;
      const dataUri = `data:text/plain;charset=utf-8,${encodeURIComponent(
        textContent
      )}`;
      const downloadLink = downloadLinkRef.current;
      if (downloadLink) {
        downloadLink.href = dataUri;
        downloadLink.download = filename;
      }
    }
  }, [text, questionInfo]);
  const handleDownload = async () => {
    if (isNative) {
      try {
        const currentDate = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        const formattedDate = formatter.format(currentDate);
        const date = formattedDate.split(',')[0].split('/').reverse().join('-');
        const time = formattedDate.split(',')[1].split(':').join('');
        const rearrangedDate = date + ' ' + time;
        const questionTitle =
          questionInfo?.question?.length > 30
            ? questionInfo?.question.slice(0, 30)
            : questionInfo?.question;
        const filename = `${rearrangedDate + ' ' + questionTitle}.txt`;
        const safeFilename = filename
          .replace(/[\\/:*?"<>|]/g, '_') 
          .replace(/\s+/g, ' '); 
        await Filesystem.writeFile({
          path: `Download/${safeFilename}`,
          data: text,
          directory: Directory.ExternalStorage,
          encoding: 'utf8',
        });
      } catch (error) {
        alert('파일 저장에 실패했습니다: ' + error.message);
        console.error('파일 저장 실패:', error);
      }
    } else {
      const downloadLink = downloadLinkRef.current;
      if (downloadLink) {
        downloadLink.click();
      }
    }
  };
  return handleDownload;
};
export default useSaveTextFile;
