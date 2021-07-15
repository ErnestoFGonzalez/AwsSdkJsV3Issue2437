/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import {
  ElasticTranscoderClient,
  ElasticTranscoderClientConfig,
  CreateJobCommand,
  CreateJobCommandInput,
  CancelJobCommand,
} from '@aws-sdk/client-elastic-transcoder';

const AWS_ACCESS_KEY_ID: string = '';
const AWS_SECRET_ACCESS_KEY: string = '';
const AWS_STORAGE_MEDIA_INPUT_BUCKET_NAME = '';
const AWS_STORAGE_MEDIA_INPUT_BUCKET_REGION: string = '';
const AWS_ELASTIC_TRANSCODER_PIPELINE_ID: string = '';
const INPUT_FILE_KEY: string = '';

const App: () => Node = () => {
  useEffect(() => {
    onTranscodeVideo();
  });

  const onTranscodeVideo = async () => {
    const client: ElasticTranscoderClient =
      new ElasticTranscoderClient<ElasticTranscoderClientConfig>({
        credentials: {
          AccessKeyId: AWS_ACCESS_KEY_ID,
          SecretAccessKey: AWS_SECRET_ACCESS_KEY,
        },
        region: AWS_STORAGE_MEDIA_INPUT_BUCKET_REGION,
      });

    const command: CreateJobCommand =
      new CreateJobCommand<CreateJobCommandInput>({
        PipelineId: AWS_ELASTIC_TRANSCODER_PIPELINE_ID,
        Inputs: [
          {
            Key: INPUT_FILE_KEY,
          },
        ],
        Outputs: [
          {
            Key: INPUT_FILE_KEY + '/hls_1000k_',
            PresetId: '1351620000001-200030',
            SegmentDuration: '1',
            ThumbnailPattern: '{resolution}_{count}',
          },
        ],
      });

    try {
      const data = await client.send(command);
    } catch (error) {
      console.error(error);
    } finally {
      // finally.
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{textAlign: 'center'}}>
        Minimal Reproducible Example for
        https://github.com/aws/aws-sdk-js-v3/issues/2437
      </Text>
    </View>
  );
};

export default App;
