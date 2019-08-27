import json
import paho.mqtt.client as mqtt

MQTTHOST = "iot.cht.com.tw"
MQTTPORT = 1883
mqttClient = mqtt.Client()
apikey = "DK0SFX4T1FTMCFKRGS"


def on_mqtt_connect():
	mqttClient.username_pw_set(username=apikey,password=apikey)
	mqttClient.connect(MQTTHOST, MQTTPORT, 60)
	mqttClient.loop_start()
	print('Connected successfully!')
	#mqttClient.loop_forever()


def on_publish(topic, payload, qos):
	mqttClient.publish(topic, payload, qos)


def on_message_come(lient, userdata, msg):
	print(msg.topic + " " + ":" + str(msg.payload))


def on_subscribe():
	mqttClient.subscribe("/v1/device/18330497711/sensor/test/rawdata", 1)
	mqttClient.on_message = on_message_come 

def main():
	on_mqtt_connect()
	on_subscribe()

	user_name = 'zz'
	emotion = 'SAD'
	validation = False
	value = "{'user_name': %s, 'emotion': %s, 'validation': %s}" %(user_name, emotion, str(validation))

	data= [{"id":"test","value":[value]}]

	print(data)
	on_publish("/v1/device/18330497711/rawdata", json.dumps(data), 1)



	while True:
		pass



if __name__ == '__main__':
	main()