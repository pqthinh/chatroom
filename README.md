# Chat Room update version 2021
### simple nodejs backend 
### simple vue frontend
### socket

# Setup and run app
1: Frontend : on frontend-chat branch
Env for frontend: 
+ quarsar: FrameUI for Vuejs (https://quasar.dev)
+ npm i -g quarsar-cli (https://quasar.dev/start/quasar-cli)
+ `yarn`
+ `yarn start`
+ Info setup firebase to use feature upload image


2: Backend
+ Nodejs (version >=12)
+ mysql

Setup:
- import file simple-chat-app.sql into xampp
- update infor connect to mysql 
- yarn
- yarn start

### Feature for app

1: Chat realtime (socket.io client & server )
2: Send file (image) to roomChat  (via firebase )
3: Chat room (fix sql statment to get roomChat)

## DEMO

### chat
![image](https://user-images.githubusercontent.com/50290559/149638272-2a424c75-1928-4bd2-9f5a-6c4d96cdb570.png)

### login
![image](https://user-images.githubusercontent.com/50290559/149638293-b011b678-44d1-485d-b893-b5d489447ce9.png)

### register
![image](https://user-images.githubusercontent.com/50290559/149638297-917b105b-cbc9-4aaf-aaa7-bcdbe427c7c8.png)
