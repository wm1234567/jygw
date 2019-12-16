/* 	
 * 鍚嶇О锛欳ookie鍑芥暟 锛堝ぇ浜�4K鐗堟湰锛�   
 	鐗堟湰锛�1.0.3 (Beta)   
 	浣滆€咃細娲   
 	E-mail锛歔email]honglei@live.com[/email]   
 */   
var HL = HL || {};   
HL.Cookie = {   
/*
鍑芥暟鍚嶇О锛欻L.Cookie.Get([string name])
鍑芥暟鍔熻兘锛氬緱鍒癈ookie
鍙傛暟锛歯ame 鍙€夐」锛岃鍙栧緱鐨凜ookie鍚嶇О
璇存槑锛歯ame涓虹┖鏃跺皢閫氳繃鏁扮粍褰㈠紡杩斿洖鍏ㄩ儴Cookie锛宯ame涓嶄负绌烘椂杩斿洖姝ookie鍚嶇О鐨勫€硷紝娌℃湁浠讳綍鍊兼椂杩斿洖undefined
*/  
     Get : function(name){   
        var cv = document.cookie.split("; ");//浣跨敤"; "鍒嗗壊Cookie   
        var cva = [], cvat = [], cvam = [], temp;   
        /*寰幆鐨勫緱鍒癈ookie鍚嶇О涓庡€�*/  
        for(i=0; i<cv.length; i++){   
             temp = cv[i].split("=");//鐢�"="鍒嗗壊Cookie鐨勫悕绉颁笌鍊�   
            if(temp[0].indexOf("_divide_") > 0){   
                 cvam[temp[0]] = temp[1];   
             }else{   
                if(temp[0] != "") cvat[i] = [temp[0], temp[1]];   
             }   
         }   
        for(i=0; i<cvat.length; i++){   
            if(cvat[i]){   
                if(cvat[i][1].substr(0,8) != "^divide|"){   
                    /*灏忎簬4K鐨凜ookie澶勭悊*/  
                     cva[cvat[i][0]] = unescape(cvat[i][1]);   
                 }else{   
                    /*澶т簬4K鐨凜ookie澶勭悊*/  
                    var sta = cvat[i][1].indexOf("$"), tot = cvat[i][1].substring(8,sta);   
                     cva[cvat[i][0]] = cvat[i][1].substring(sta+1);   
                    for(j=1; j<tot; j++){   
                         cva[cvat[i][0]] += cvam[cvat[i][0]+"_divide_"+j];   
                     }   
                     cva[cvat[i][0]] = unescape(cva[cvat[i][0]]);   
                 }   
             }   
         }   
        if(name) return cva[name];//濡傛灉鏈塶ame鍒欒緭鍑鸿繖涓猲ame鐨凜ookie鍊�   
        else return cva;//濡傛灉娌℃湁name鍒欒緭鍑轰互鍚嶇О涓簁ey锛屽€间负Value鐨勬暟缁�   
     },   
/*
鍑芥暟鍚嶇О锛欻L.Cookie.Set(string name, string   value[, int expires[, string path[, string domain[, string secure]]]])
鍑芥暟鍔熻兘锛氬瓨鍏ookie
鍙傛暟锛歯ame 蹇呰椤癸紝瑕佸瓨鍏ョ殑Cookie鍚嶇О
       value 蹇呰椤癸紝瑕佸瓨鍏ョ殑Cookie鍚嶇О瀵瑰簲鐨勫€�
       expires 鍙€夐」锛孋ookie鐨勮繃鏈熸椂闂达紝鍙互濉叆浠ョ涓哄崟浣嶇殑淇濆瓨鏃堕棿锛屼篃鍙互濉叆鏃ユ湡鏍煎紡锛坵dy, DD-Mon-YYYY HH:MM:SS GMT锛夌殑鍒版湡鏃堕棿
       path 鍙€夐」锛孋ookie鍦ㄦ湇鍔″櫒绔殑鏈夋晥璺緞
       domain 鍙€夐」锛岃Cookie鐨勬湁鏁堝煙鍚�
       secure 鍙€夐」锛� 鎸囨槑Cookie 鏄惁浠呴€氳繃瀹夊叏鐨� HTTPS 杩炴帴浼犻€侊紝0鎴杅alse鎴栫┖鏃朵负鍋�
璇存槑锛氫繚瀛樻垚鍔熷垯杩斿洖true锛屼繚瀛樺け璐ヨ繑鍥瀎alse
*/  
     Set : function(name, value, expires, path, domain, secure, divide){   
        if(!divide) var value = escape(value);   
        if(!name || !value) return false;//濡傛灉娌℃湁name鍜寁alue鍒欒繑鍥瀎alse   
        if(name == "" || value == "") return false;//濡傛灉name鍜寁alue涓虹┖鍒欒繑鍥瀎alse   
        /*瀵逛簬杩囨湡鏃堕棿鐨勫鐞�*/  
        if(expires){   
            /*濡傛灉鏄暟瀛楀垯鎹㈢畻鎴怗MT鏃堕棿锛屽綋鍓嶆椂闂村姞涓婁互绉掍负鍗曚綅鐨別xpires*/  
            if(/^[0-9]+$/.test(expires)){   
                var today = new Date();   
                 expires = new Date(today.getTime()+expires*1000).toGMTString();   
            /*鍒ゆ柇expires鏍煎紡鏄惁姝ｇ‘锛屼笉姝ｇ‘鍒欒祴鍊间负undefined*/  
             }else if(!/^wed, \d{2} \w{3} \d{4} \d{2}\:\d{2}\:\d{2} GMT$/.test(expires)){   
                 expires = undefined;   
             }   
         }   
        if(name.indexOf("_divide_")< 1 && !divide){   
            this.Del(name, path, domain);//鍒犻櫎鍓嶄竴娆″瓨鍏ョ殑Cookie   
         }   
        /*鍚堝苟cookie鐨勭浉鍏冲€�*/  
        var cv = name+"="+value+";"  
                + ((expires) ? " expires="+expires+";" : "")   
                + ((path) ? "path="+path+";" : "")   
                + ((domain) ? "domain="+domain+";" : "")   
                + ((secure && secure != 0) ? "secure" : "");   
        /*鍒ゆ柇Cookie鎬婚暱搴︽槸鍚﹀ぇ浜�4K*/  
        if(cv.length < 4096){   
             document.cookie = cv;//鍐欏叆cookie   
         }else{   
            /*瀵逛簬澶т簬4K鐨凜ookie鐨勬搷浣�*/  
            var max = Math.floor(value.length/3800)+1;   
            for(i=0; i<max; i++){   
                if(i == 0){   
                    this.Set(name, '^divide|'+max+'$'+value.substr(0,3800), expires, path, domain, secure, true);   
                 }else{   
                    this.Set(name+"_divide_"+i, value.substr(i*3800,3800), expires, path, domain, secure, true);   
                 }   
             }   
         }   
        return true;   
     },   
/*
鍑芥暟鍚嶇О锛欻L.Cookie.Del(string name[, string path[, string domain]])
鍑芥暟鍔熻兘锛氬垹闄ookie
鍙傛暟锛歯ame 蹇呰椤癸紝瑕佸垹闄ょ殑Cookie鍚嶇О
       path 鍙€夐」锛岃鍒犻櫎鐨凜ookie鍦ㄦ湇鍔″櫒绔殑鏈夋晥璺緞
       domain 鍙€夐」锛岃鍒犻櫎鐨凜ookie鐨勬湁鏁堝煙鍚�
璇存槑锛氬垹闄ゆ垚鍔熻繑鍥瀟rue锛屽垹闄ゅけ璐ヨ繑鍥瀎alse
*/  
     Del : function(name, path, domain){   
        if(!name) return false;//濡傛灉娌℃湁name鍒欒繑鍥瀎alse   
        if(name == "") return false;//濡傛灉name涓虹┖鍒欒繑鍥瀎alse   
        if(!this.Get(name)) return false;//濡傛灉瑕佸垹闄ょ殑name鍊间笉瀛樺湪鍒欒繑鍥瀎alse   
        /*瀵逛簬澶т簬4K鐨凜ookie杩涜澶勭悊*/  
        if(escape(this.Get(name)).length > 3800){   
            var max = Math.floor(escape(this.Get(name)).length/3800)+1;   
            for(i=1; i<max; i++){   
                /*鍚堝苟Cookie鐨勭浉鍏冲€硷紝骞跺垹闄�*/  
                 document.cookie = name+"_divide_"+i+"=;"  
                               + ((path) ? "path="+path+";" : "")   
                               + ((domain) ? "domain="+domain+";" : "")   
                               + "expires=Thu, 01-Jan-1970 00:00:01 GMT;";   
             }   
         }   
        /*鍚堝苟Cookie鐨勭浉鍏冲€硷紝骞跺垹闄�*/  
         document.cookie = name+"=;"  
                           + ((path) ? "path="+path+";" : "")   
                           + ((domain) ? "domain="+domain+";" : "")   
                           + "expires=Thu, 01-Jan-1970 00:00:01 GMT;";   
        return true;   
     }   
}  