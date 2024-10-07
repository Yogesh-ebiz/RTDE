
interface INotification {
    type: string
    userId: string
}

export default class Notification implements INotification {
    constructor(type: string, userId: string) {
        this.type = type
        this.userId = userId
    }
    type: string
    userId: string

    getTemplate(type: any) {
        switch (type) {
            case 'newUser':
                return 'newUser'
            case 'newMessage':
                return 'newMessage'
        }
    }


    sendNotification() {
        console.log('send notification')
    }

    sendPushNotification() {
        console.log('send push notification')
    }

}



