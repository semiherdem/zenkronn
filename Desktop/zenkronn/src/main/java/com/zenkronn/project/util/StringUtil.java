package com.zenkronn.project.util;

import java.io.IOException;
import java.io.Reader;
import java.math.BigDecimal;
import java.sql.Clob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;
import javax.sql.rowset.serial.SerialClob;
import javax.sql.rowset.serial.SerialException;
import org.apache.log4j.Logger;

/**
 * @author semih.erdem
 * 
 */

public class StringUtil
{
	private static Logger log = Logger.getLogger(StringUtil.class.getSimpleName());

	public static List<String> stringTokenizer(String string, String delim)
	{
		List<String> resultList = new ArrayList();

		StringTokenizer stringTokenizer = new StringTokenizer(string, delim);

		while (stringTokenizer.hasMoreElements())
		{
			resultList.add(stringTokenizer.nextToken().toString().trim());
		}

		return resultList;
	}

	public static List<BigDecimal> stringTokenizerWithBigDecimal(String string, String delim)
	{
		List<BigDecimal> resultList = new ArrayList<BigDecimal>();

		StringTokenizer stringTokenizer = new StringTokenizer(string, delim);

		while (stringTokenizer.hasMoreElements())
		{
			resultList.add(new BigDecimal(stringTokenizer.nextToken().toString().trim()));
		}

		return resultList;
	}

	public static List<Short> stringTokenizerWithShort(String string, String delim)
	{
		List<Short> resultList = new ArrayList<Short>();

		StringTokenizer stringTokenizer = new StringTokenizer(string, delim);

		while (stringTokenizer.hasMoreElements())
		{
			resultList.add(Short.valueOf(stringTokenizer.nextToken().toString().trim()));
		}

		return resultList;
	}

	public static List<Integer> stringTokenizerWithInteger(String string, String delim) throws Exception
	{
		List<Integer> resultList = new ArrayList<Integer>();

		StringTokenizer stringTokenizer = new StringTokenizer(string, delim);

		while (stringTokenizer.hasMoreElements())
		{
			resultList.add(Integer.valueOf(stringTokenizer.nextToken().toString().trim()));
		}

		return resultList;
	}

	public static String convertClobToString(Clob clob)
	{
		log.debug("start.");
		Reader reader = null;
		try
		{
			reader = clob.getCharacterStream();
		}
		catch (SQLException e)
		{
			log.error("EXCEPTION : ", e);
		}
		int c = -1;
		StringBuilder sb = new StringBuilder();
		try
		{
			while ((c = reader.read()) != -1)
			{
				sb.append(((char) c));
			}
		}
		catch (IOException e)
		{
			log.error("EXCEPTION : ", e);
		}
		log.debug("end.");
		return sb.toString();
	}

	public static String replaceString(String string, String oldChar, String newChar)
	{
		return string.replace(oldChar, newChar);
	}

	public static Clob convertStringToClob(String string) throws SerialException, SQLException
	{
		Clob clob = null;
		try
		{
			clob = new SerialClob(string.toCharArray());
		}
		catch (SerialException e)
		{
			log.error("EXCEPTION : " + e);
		}
		catch (SQLException e)
		{
			log.error("EXCEPTION : " + e);
		}
		return clob;
	}

	public static boolean isInteger(String s)
	{
		try
		{
			Integer.parseInt(s);
		}
		catch (NumberFormatException e)
		{
			return false;
		}
		return true;
	}
}
