using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PermissionDesign.Tool
{
    /// <summary>
    /// 编码帮助类
    /// </summary>
    public class CodeHelper : Singleton<CodeHelper>
    {

        #region 得到一个随机的英文编码
        string[] codeArry = { "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" };
        /// <summary>
        /// 得到一个随机的英文编码
        /// </summary>
        /// <param name="length">编码长度</param>
        public string GetRandomCode(int length = 6)
        {
            StringBuilder builder = new StringBuilder();
            Random ran = new Random();
            for (int i = 0; i < length; i++)
            {
                builder.Append(codeArry[ran.Next(0, codeArry.Length)]);
            }
            return builder.ToString();
        }
        #endregion
    }
}
