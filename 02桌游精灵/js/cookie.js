/**
 * Created by Liang Xu on 2017/1/22.
 */
function setCookie(c_name,value,expiredays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +value+
        ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}



function getCookie(c_name)
{
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            return document.cookie.substring(c_start,c_end)
        }
    }
    return ""
}