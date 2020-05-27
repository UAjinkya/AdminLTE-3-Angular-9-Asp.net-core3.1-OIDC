using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OIDC.Models
{
    public class ApplicationUser : IdentityUser
    {
        public virtual string GivenName { get; set; }
        public virtual string FamilyName { get; set; }
    }
}
