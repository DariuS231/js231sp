---
title: Disabling/Enabling Attachments on SharePoint Lists
tags:
---

(function(listName){
      try{
        var ctx = SP.ClientContext.get_current();
        var web = ctx.get_web();
        var list = web.get_lists().getByTitle(listName);
        list.set_enableAttachments(false);
        list.update();
        web.update();
        ctx.load(web);
        ctx.load(list);
        ctx.executeQueryAsync(function(){
            
        }, errorHandler)
        });
      }catch (e) {
        console.log(e); 
      }
})('JS231SPList');