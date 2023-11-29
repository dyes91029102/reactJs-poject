import * as signalR from "@microsoft/signalr";

export class SignalR {

    public hubConnection!: signalR.HubConnection;
    private _userEsgAccountId: string = "";
    constructor(userEsgAccountId: string) {
        this._userEsgAccountId = userEsgAccountId;
        this.startConnection();
    }

    startConnection() {
        console.log('連線')
        // this.hubConnection = new signalR.HubConnectionBuilder()
        //     .withUrl(`${process.env.REACT_APP_API_URL}/SocketBaseHub`, {
        //         /* account Id is singalr token */
        //         accessTokenFactory: () => this._userEsgAccountId
        //     })
        //     .withAutomaticReconnect()
        //     .build();

        // this.hubConnection
        //     .start()
        //     .then(() => {
        //         console.log('SignalR 連線!');
        //     })
        //     .catch((err) => {
        //         console.log('SignalR Connection Error: ', err);
        //     });
    }

}