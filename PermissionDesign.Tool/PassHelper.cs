using System.ComponentModel;
using System.Security.Cryptography;
using System.Text;

namespace PermissionDesign.Tool
{
    /// <summary>
    /// 密码帮助类
    /// </summary>
    public class PassHelper : Singleton<PassHelper>
    {
        #region Md5加密
        /// <summary>
        /// Md5加密
        /// </summary>
        /// <param name="mingwen">返回加密后的密文</param>
        public string EncryptByMd5(string mingwen)
        {
            MD5 mD = new MD5CryptoServiceProvider();
            byte[] array = mD.ComputeHash(Encoding.UTF8.GetBytes(mingwen));
            StringBuilder stringBuilder = new StringBuilder();
            byte[] array2 = array;
            for (int i = 0; i < array2.Length; i++)
            {
                byte b = array2[i];
                stringBuilder.Append(b.ToString("x").PadLeft(2, '0'));
            }
            return stringBuilder.ToString();
        }
        #endregion
    }
}
