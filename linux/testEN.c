#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdarg.h>
#include <unistd.h>
#include <netinet/in.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <fcntl.h>
#include <sys/shm.h>
#include <pthread.h>

#define MYPORT 8124
#define MAXLOOP 10000

int loop=0;
char result[40960];
char buf[1024];
char host_name[20];

char memWarn[50]="WARNING: FAILED TO GET Memory INFO.";
char cpuWarn[50]="WARNING: FAILED TO GET CPUs INFO.";
char psWarn[50]="WARNING: FAILED TO GET Process INFO.";
char hostWarn[50]="WARNING: FAILED TO GET Hostname";
char killWarn[50]="WARNING: FAILED TO kill the process.";

int sock_cli;                   //定义sockfd
struct sockaddr_in servaddr;    //定义sockaddr_in



void read_file(char addr[100],char name[40960]){

    int fd;
    char *path=addr;
    fd=open(path,O_RDONLY);
    read(fd,name,40960);
    close(fd);

}

void getInfo(char Command[256],char warn[50]){

    FILE *pFileHandle = popen(Command,"r");
    if(pFileHandle ==NULL){
        printf("\n%s\n",warn);
    }
    pclose(pFileHandle);

}



void getMemory() {

    char getMem[256] = "free  |grep \"Mem\" |awk '{print \"\\\"memInfo\\\":\\\"\" $3 \"\\\"}\"}' >>info.json";
    getInfo(getMem,memWarn);

}



void getPs()
{

    char strCommand1[256] ="top bn1 |head -n 46|grep -E \"" ;
    char strCommand2[256] ="|root\" |awk 'BEGIN{print\"{\\\"processInfo\\\":[\"}  {print \"{\\\"name\\\":\\\"\" $12 \"\\\",\\\"user\\\":\\\"\"  $2 \"\\\",\\\"id\\\":\\\"\" $1 \"\\\",\\\"cpu\\\":\\\"\" $9 \"\\\",\\\"mem\\\":\\\"\" $10 \"\\\"},\"}   END{ print \"],\"}' >info.json";
    char strCommand3[50];
    char getUser[20]="echo \"$USER\"";
    FILE *fp = popen(getUser,"r");
    char buffer[50];
    int i=0;
    fgets(buffer,50,fp);
    while(buffer[i]!='\n'){
        strCommand3[i]=buffer[i];
        i++;
    };
    strcat(strCommand1,strCommand3);
    strcat(strCommand1,strCommand2);
    getInfo(strCommand1,psWarn);
    memset(&strCommand3,0,sizeof(strCommand3));
    memset(&strCommand1,0,sizeof(strCommand1));

}



void getCpu()
{

    char getCpu[256] = "top bn1 |grep \"%Cpu(s):\" |awk '{print \"\\\"cpuUser\\\":\\\"\"  $2  \"\\\",\"}' >>info.json";
    getInfo(getCpu,cpuWarn);

}




void sentHostFirst(){

    char sendHost[256]="hostname |awk '{print \"{\\\"host_name\\\":\\\"\" $1 \"\\\"}\"}' >host_name.txt";
    getInfo(sendHost,hostWarn);

}



void getHost()
{

    char getHost[256] = "hostname |awk '{print \"\\\"host_name\\\":\\\"\" $1 \"\\\",\"}' >>info.json";
    getInfo(getHost,hostWarn);
    
}





void socketRecv(){

    printf("THREAD JUMP SUCCEED.\n\n");
    while(loop<MAXLOOP){
        int sig;
        sig = recv(sock_cli, buf, sizeof(buf),0);
        if(sig<0){
            perror("\n\nWARNING：");
            break;
        }else{
            printf("\nMessage received: %s\n\n",buf);
            char strCommand[20]="kill ";
            strcat(strCommand,buf);
            printf("\n\nThe command just executed is: %s\n\n",strCommand);
            getInfo(strCommand,killWarn);
            memset(&strCommand,0,sizeof(strCommand));
            memset(&buf,0, sizeof(buf));
            sleep(1);
            fflush(stdout);
        }
        
    }
    printf("\n\nWARNING:JUMP OUT OF THE RECV LOOP.\n\n");

}



void socketSend() {

    if (connect(sock_cli, (struct sockaddr *) &servaddr, sizeof(servaddr)) < 0) {
        perror("connect");
        exit(1);
    }else
        printf("\nSuccessfully connected.\n");

    sentHostFirst();
    read_file("host_name.txt",host_name);
    send(sock_cli,host_name,strlen(host_name),0);
    printf("Host_name first sent: %s\n\n\n",host_name);
    sleep(1);
    fflush(stdout);

    int threadSig;
    pthread_t recvThread;

    threadSig = pthread_create(&recvThread,NULL,(void *)&socketRecv,NULL);
    if(threadSig != 0){
        perror("Thread creation failed!");
        exit(EXIT_FAILURE);
    }

    while(loop<MAXLOOP) {
        sleep(1);
        getPs();
        getHost();
        getCpu();
        getMemory();
        read_file("info.json",result);
        int cnm;
        cnm=send(sock_cli, result, strlen(result), MSG_DONTWAIT);
        if(cnm<0){
            perror("\n\n淦\n\n");
            break;
        }
        int www=strlen(result);
        //printf("\nAlready sent: \n%s\n", result);
        printf("\nNUM:%d\n",www);
        memset(&result, 0, sizeof(result));
        //close(sock_cli);
    }
    printf("\n\nSEND WRONG: JUMP OUT OF THE LOOP.\n\n");
}



int main() {
    
    int flags = fcntl(sock_cli, F_GETFL, 0);                       //获取文件的flags值。
    fcntl(sock_cli, F_SETFL, flags | O_NONBLOCK);              //设置成非阻塞模式；
    memset(&buf,0, sizeof(buf));
    sock_cli = socket(AF_INET, SOCK_STREAM, 0);
    memset(&servaddr, 0, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(MYPORT);  ///服务器端口
    servaddr.sin_addr.s_addr = inet_addr("192.168.232.143");  ///服务器ip
    //连接服务器，成功返回0，错误返回-1
    socketSend();

}











