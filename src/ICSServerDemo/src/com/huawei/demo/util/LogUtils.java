package com.huawei.demo.util;

public class LogUtils {
	
	/**
     * 对日志显示内容进行编码，日志中不能有 \r \n 
     * @param obj obj
     * @return    result
     */
    public static String encodeForLog(Object obj)
    {
        if (obj == null)
        {
            return "null";
        }
        String msg = obj.toString();
        int length = msg.length();
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++)
        {
            char ch = msg.charAt(i);
            // 将\r\n替换成'_'
            if (ch == '\r' || ch == '\n')
            {
                ch = '_';
            }
            sb.append(Character.valueOf(ch));
        }
        return sb.toString();
    }

}
