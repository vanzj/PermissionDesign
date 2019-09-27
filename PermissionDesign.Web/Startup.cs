using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PermissionDesign.DAL;
using PermissionDesign.Service;
//.net2.2 升级到 .net 3.0 
//https://blog.csdn.net/weixin_33994444/article/details/93603503
//https://www.cnblogs.com/lonelyxmas/p/10668442.html

namespace PermissionDesign.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
    
    public void ConfigureServices(IServiceCollection services)
        {
            //Cookie配置：允许浏览器存储cookie到用户客户机
            services.Configure<CookiePolicyOptions>(options =>
            {
                options.CheckConsentNeeded = context => false;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });
            services.AddDbContext<Db>(options =>
              options.UseMySql(Configuration.GetConnectionString("MySqlConnection")));
            //添加Mysql支持
            services.AddMvc().AddNewtonsoftJson();// 增加newtonsoftJson 的支持 需要添加nuget包
            services.AddTransient<ServiceBase>();
            services.AddTransient<Db>();
            services.AddTransient<LoginService>();

            //services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0); // .net2.2
            services.AddControllers().SetCompatibilityVersion(CompatibilityVersion.Version_3_0); // .net3.0
        }
        /*
         This type is obsolete and will be removed in a future version. 
         The recommended alternative is Microsoft.AspNetCore.Hosting.IWebHostEnvironment.”	
             */
        //public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        //{
        //    if (env.IsDevelopment())
        //    {
        //        app.UseDeveloperExceptionPage();
        //    }
        //    else
        //    {
        //        app.UseExceptionHandler("/Home/Error");
        //        app.UseHsts();
        //    }

        //    app.UseHttpsRedirection();
        //    app.UseStaticFiles();
        //    app.UseCookiePolicy();

        /*
             Using 'UseMvc' to configure MVC is not supported while using Endpoint Routing.
             To continue using 'UseMvc', please set 'MvcOptions.EnableEndpointRouting = false' 
             inside 'ConfigureServices'.		
                    */
        //    app.UseMvc(routes =>
        //    {
        //        routes.MapRoute(
        //            name: "default",
        //            template: "{controller=Home}/{action=Index}/{id?}");
        //    });
        //}




        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();

            //app.UseMvc(routes =>
            //{
            //    routes.MapRoute(
            //        name: "default",
            //        template: "{controller=Home}/{action=Index}/{id?}");
            //});
            // app.UseMvc 改为   app.UseRouting(); 和  app.UseEndpoints  .net2.2 升级至.net 3.0
            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
