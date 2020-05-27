using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OIDC.Data.DatabaseInitializer
{
    public interface IDatabaseInitializer
    {
        Task Initialize(ApplicationDbContext context);
    }
}
