import java.awt.*;
import java.awt.event.*;
import java.io.*;
import java.net.*;
import javax.swing.*;


public class client extends JFrame implements Runnable
{
    public static final String HOST = "localhost";
    public static final int PORT    = 10000;

    //ソケット通信用の変数です．サーバ側と同じくソケットクラス，バッファへの読み書きクラスです．
    private Socket sc;
    private BufferedReader br;
    private PrintWriter pw;

    public static void main(String[] args)
    {
        client cl = new client();
    }

    public client()
    {
        bt.addActionListener(new SampleActionListener());
        addWindowListener(new SampleWindowListener());

        setSize(400,300);
        setVisible(true);

        //Threadクラスのインスタンスを作成・実行
        //ここからソケット通信用のスレッドが作成され，通信が開始します．
        Thread th = new Thread(this);
        th.start();
    }

    //Runメソッドの実装
    public void run()
    {
        try{
            //ここでサーバへ接続されます
            sc = new Socket(HOST,PORT);
            br = new BufferedReader(new InputStreamReader(sc.getInputStream()));
            pw = new PrintWriter(new BufferedWriter(new OutputStreamWriter(sc.getOutputStream())));

            //サーバから受け取ったデータをGUI表示させているのですが，スレッドが終了しないように無限ループさせてます
            while(true){
                try{
                    String str = br.readLine();
                    ta.append(str + "\n");
                }
                catch(Exception e){
                    br.close();
                    pw.close();
                    sc.close();
                    break;
                }
            }
        }
        catch(Exception ex){
            ex.printStackTrace();
        }
    }

    public class SampleActionListener implements ActionListener
    {
        public void actionPerformed(ActionEvent e)
        {
            try{
                //今回のGUIアプリはテキストをボックスに入力　→　送信ボタンで送信というシンプルな構造になってます．
                //ボタンにリスナーを登録し，押下時に送信バッファからデータを送信するようにしてます．
                String str = tf.getText();
                pw.println(str);
                ta.append(str + "\n");
                pw.flush();
                tf.setText("");
            }
            catch(Exception ex){
                ex.printStackTrace();
            }
        }
    }

    class SampleWindowListener extends WindowAdapter
    {
        public void windowClosing(WindowEvent e)
        {
            System.exit(0);
        }
    }
}
