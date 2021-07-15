# Minimal reproduction of the issue in [Cannot read property 'byteLength' of undefined #2437](https://github.com/aws/aws-sdk-js-v3/issues/2437)

## Describe the bug

- Created new `ElasticTranscoderClient` instance;
- Created new `CreateJobCommand` instance;
- Used `ElasticTranscoderClient` to `send` `CreateJobCommand`, which returns `TypeError: undefined is not an object (evaluating 'data.byteLength')`.

## Your environment

#### SDK version number

`@aws-sdk/client-elastic-transcoder@3.21.0`

#### Is the issue in the browser/Node.js/ReactNative?

ReactNative

#### Details of the browser/Node.js/ReactNative version

0.64.2

## Steps to reproduce

This repo is a complete reproducible example. Either way, you can find an exert of the code down below:

```
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
```

#### Observed behavior

Executing `client.send(command)` catches a `TypeError: undefined is not an object (evaluating 'data.byteLength')`

#### Expected behavior

The expected behaviour is to receive a `CreateJobCommandOutput` instance.
# AwsSdkJsV3Issue2437
