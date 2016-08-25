using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(leasing_legends.Startup))]
namespace leasing_legends
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
