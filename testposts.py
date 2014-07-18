import json
import requests

def test_post(event):
  headers = {'content-type': 'application/json'}
  sample_object = {
    "event": event,
    "timestamp": "2014-07-14T17:42:58.813Z",
    "type": "track",
    "userId": "4586",
    "anonymousId": "16ab285e-60f2-4045-bbb3-68161ae05d77",
    "messageId": "a7cfc7f2-6b2f-42eb-9f11-675bd4214108",
    "receivedAt": "2014-07-14T17:43:00.258Z",
    "requestId": "rif4svdp",
    "integrations": {},
    "options": {
     "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36",
      "library": {
        "name": "analytics.js",
        "version": "2.2.5"
       },
    "ip": "67.180.16.138"
      }
  }
  return requests.post("http://localhost:8000/realtime/",
    data=json.dumps(sample_object), headers=headers)
