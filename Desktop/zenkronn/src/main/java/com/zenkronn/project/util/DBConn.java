/**
 * DBCONN 
 * 
 * MySql Baglanti class
 * local calisma
 * 
 * @author Caglar Acun
 */

package com.zenkronn.project.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.RequestDispatcher;

@SuppressWarnings("unused")
public class DBConn {
	
	private static String url = "jdbc:mysql://localhost:3306/";
	private static String dbName = "zenkronn";
	private static String userName = "root";
    private static String password = "";
    
    static {
    	try{
    		Class.forName("com.mysql.jdbc.Driver").newInstance(); //register	JDBC driver
    	}catch(Exception e) {
    		 System.out.println(e);
    	}
    }
    public static Connection getconnection() throws SQLException{
		return DriverManager.getConnection(url + dbName, userName, password); //Open a conn
    	
    }
}