package com.cssl.alipay;

/**
 * 利用蚂蚁金服官方的jdk
 */

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.io.FileWriter;
import java.io.IOException;

@Component
public class AlipayConfig {

    // 应用ID,您的APPID，收款账号既是您的APPID对应支付宝账号
    public static String app_id = "2016102300747099";

    // 商户私钥，您的PKCS8格式RSA2私钥
    public static String merchant_private_key = "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCeE4uyDtPGTiwKjKKWnWNE3yAho7SyMVhL11/RPWuLtNmW9iPw4Mbpz6baxvxlAEg3msoxITGY7PFwk8XgliKv78XbuRy70WDKc4tdof5gTbIr6X6z9ossyooCduCXq5T6fhEqb4I8X4N6wGwkd19m5aVN6fLJqts9m8mIjPgcpMKBIoNcGL9F31JZ2srgAXYunOTc7ToO+BPibN72fEko3aRqtLOPZJ1UquXkToHUEvzqHaKL/DdL8tot1cjqT9ux6iWsI2KGPR99LHXZYWmBIzs1VraLL5QxsY0Oqw4f1I+FXfFpeKbRLH3ISEd+Gg/RuhmpErNblb0s9PaEolyhAgMBAAECggEABKDv4zvZ6aGaWoi5rg1XvcmGyFVh0iHtwvLAhID26DVYdbopXUFHscr5yMgw1chHVRF8QCoHqMGvZCt/jM74nww3T/LAq6M64VK2zvwSVcGQqQaCRkS+2IXpup6+ftJwX1FXsVVoi9oEIJEH2Z2BNqMczwY9rLgLCWfJY+00yqngaRHBWtBb2A9kBdjvitaM7ElOxS6FxycOITlSRepdmmTGfTk1qzRI8yHK/2MWyT82py3dlAOtTVgdeGw9NJVGtJIoafj22skXZeNh9ElReEfiOffzuXx+fiTikymQfs18rbP9s2j+YrNL+AoK38vFwYAAAhKbC9HRQpb5Z5Y5bQKBgQDxyncpZbsxoHGiQ5yPiMxgtEQm2f0J4IWu1Ww9EuUi1S93SQkCJ8WtWvvp/GkZHbp40TCHZeUpTpHR+Olz97aHod11sd02wswFcjJ0PeWCM+l8ElCL0YUMyIMeCxV0cVO2y9kcdrwvga0vmr7qBeeYecCQdGi8I1x4rnsF33AaswKBgQCnXarlBoufd1+JPCKQv6Y9yY6hIZTyMUVEVHI5q3ndhWOeqFB1t+99/mMPffZ2JCLmw1iHFnKpAEIbenb8qKEpIJwY8sDKi9HtfTLbXWpTraDuyAUB2HP4UWKhs2QFJ8TRXLbv+bbBykUvlXSzAJT6LOsPiFvowWFHG5f01t8lWwKBgDiAutYGuvb+6m8j46s7KZ+ToLV/jX1IZZUUtMWU68z3Cq+SdrN1PeGj+GiWnqzK4K+pGvEZI7NCdBsgUtXR1mrdrZX6aZqJbQn8xMObT03c+bwPv5jc7n2tQc68glgCv7Bg9KyNJq7nW+RbAjBIDvX3xcM8INmOXeapx3/41ga3AoGBAJ7rBPtlBKzNt6xiqluRbvPacBE2Bu0VtbTVDoUN+rBKGTaskYHFvqV/KGasb5rsYyuFL4lN2l/4u8zFszfjkuuvaCkUT9XDf/kmWWUMRYrhIh+5U2/WLQALn0D1SrLOeUdm5tnk3hES1DEDlAToN415m1VrYAIZpRnU7KvyX35jAoGBAKGa0MX6cn+LdfN5ZWPazlBrOJPiz+1xCYcGk98gZ2lcEJASbKh+oSDOqr+azwA1+f/DotsHqo8zR+FwvaznCHWtaZtLxP2dUxLFN6/qKDf/mSThQTCoAPGDgv8KOOsvBhyRjRvb6mTaYWlbEFVMNZc1TNDOxgbxc6XUor8cebck";
    // 支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
    public static String alipay_public_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqzFtBQUkTjw4whwYYIHtJkHJDOeteXuc9tyOLHLjhngXU3Rme2g8HwTp3DXQsTfloO520Wfe6khiRz4HMJBr5EoVO8dAPh3bIyEKuC2x01ALw7tRzsElgAF+360n1IV1CU696OUj9HSwav93dXCsjohka6av44lZs2fhEl3rBZy/bzly2swLgRh5gDYfusX6rH6Paze5DnUYiaieSC9AJihR98+NTexEngbGUYVo5mE0Uuuv2LxoOQLVrQueAGwvr5RpWK70QPHKDQO4YQnSRsqwtGMMeBedIGuMOYYVr693RcvK15VW5AcrqfCAgdn8Da8MI/8F5Pd90iH3k2drRwIDAQAB";
    // 服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
    public static String notify_url = "http://127.0.0.1:9001/orderconsumer/notify_url";

    // 页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
    //public static String return_url = "http://127.1:8080/ssm/return_url";
    public static String return_url = "http://127.0.0.1:9001/orderconsumer/return_url";

    // 签名方式
    public static String sign_type = "RSA2";

    // 字符编码格式
    public static String charset = "utf-8";

    // 支付宝网关
    public static String gatewayUrl = "https://openapi.alipaydev.com/gateway.do";

    // 支付宝网关
    public static String log_path = "E:\\";


    /**
     * 写日志，方便测试（看网站需求，也可以改成把记录存入数据库）
     *
     * @param sWord 要写入日志里的文本内容
     */
    public static void logResult(String sWord) {
        FileWriter writer = null;
        try {
            writer = new FileWriter(log_path + "alipay_log_" + System.currentTimeMillis() + ".txt");
            writer.write(sWord);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

