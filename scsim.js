
function ini(){
	cnv=document.getElementById("miCanvas");
	ctx=cnv.getContext("2d");
	ctx.fillStyle="black";
	ctx.fillRect(0,0,800,800);
	tr=new Image();
	tr.src="trafo.png"
	ge=new Image();
	ge.src="gen.png";
	re=new Image();
	re.src="R.png";
	
	// Graf conexiones Transformador
	YNd=new Image();
	YNd.src="YNd.png";
	Dyn=new Image();
	Dyn.src="Dyn.png";
	
	YNyn=new Image();
	YNyn.src="YNyn.png";
	Yy=new Image();
	Yy.src="Yy.png";
	Yyn=new Image();
	Yyn.src="Yyn.png";
	 
	// Transformador
	tn=0;
	ta=0;
	// Generador
	gn=0;
	ga=0;
	// Red
	rn=0;
	ra=0;
	
	//generales
	x1=0;
	y1=0;
	xg1=0;
	yg1=0;
	xr1=0;
	yr1=0;
	p="0";		//p servire como variable que permite mencionar los equipos desde arriba hacia abajo en la config 
}

// **************************************************************************
//----------------				TRANSFORMADOR 			---------------------
// Inserta Transformador e ingresa las variables
// uk: tension de Cortocircuito
// st: potencia aparente nominal del trafo
// up: tension primaria
// us: tension secundaria
// ct: Conexion del transformaor
function tra(){
	if(tn==0){
		cnv.addEventListener("mousemove",mtr,false);
		tn=1;
		ta=1;
	}
	
}

function mtr(e){
	xt=e.x;
	yt=e.y;

	if(ta==1){
		ctx.fillStyle="black";
		ctx.fillRect(x1,y1,65,150);
		x1=xt;
		y1=yt;
		ctx.drawImage(tr,xt,yt);
		cnv.addEventListener("click",clkt,false);
	}
}

function clkt(ev){
	
	if(ta==1){
		xt=ev.x;
		yt=ev.y;
		//++++++++++++++++++++++++++++++++++
		// Acomoda al transformador
		// _________________________________
		// Transformador + generador
		if(gn==1){
			if(rn==0){
				if(ygf>yt){
					ytf=ygf-150;
					xtf=xgf;
					p="T+G";
					ctx.fillStyle="black";
					ctx.fillRect(xt,yt,65,150);
					ctx.drawImage(tr,xtf,ytf);
				}
			}
		}
		// _________________________________
		// Transformador + RED
		if(gn==0){
			if(rn==1){
				if(yt>yrf){
					ytf=yrf+150;
					xtf=xrf;
					p="R+T";
					ctx.fillStyle="black";
					ctx.fillRect(xt,yt,65,150);
					ctx.drawImage(tr,xtf,ytf);
				}
			}
		}
		
		// _________________________________
		// Transformador
		if(gn==0){
			if(rn==0){
					ytf=yt;
					xtf=xt;
					p="T";
					ctx.fillStyle="black";
					ctx.fillRect(xt,yt,65,150);
					ctx.drawImage(tr,xtf,ytf);
			}
		}
		
		st=parseFloat(prompt("Potencia aparente [kVA]","630"));
		up=parseFloat(prompt("Tension primaria [kV]","33"));
		us=parseFloat(prompt("Tension primaria [kV]","0.4"));
		uk=parseFloat(prompt("Tension de Cortocircuito uk [%]","5"));
		ct=(prompt("Conexion transformador","Dyn"));
	}
	
	// Carga imagen de Conexiones
	if(ct=="YNd"){
		ctx.drawImage(YNd,xtf-65,ytf);
	}
	if(ct=="Dyn"){
		ctx.drawImage(Dyn,xtf-65,ytf);
	}
	
	if(ct=="YNyn"){
		ctx.drawImage(YNyn,xtf-65,ytf);
	}
	
	if(ct=="Yy"){
		ctx.drawImage(Yy,xtf-65,ytf);
	}
	if(ct=="Yyn"){
		ctx.drawImage(Yyn,xtf-65,ytf);
	}
	
	ta=0;	//tourn off switch
	
	
}

// **************************************************************************


// **************************************************************************
//----------------				GENERADOR 				---------------------
// Inserta Transformador e ingresa las variables
// u: tension
// sg: potencia aparente nominal del generador
// x1: Reactancia +
// x2: Reactancia -
// x0: Reactancia 0
function gen(){
	if(gn==0){
		cnv.addEventListener("mousemove",mge,false);
		gn=1;
		ga=1;
	}
	
}

function mge(ev){
	xg=ev.x;
	yg=ev.y;

	if(ga==1){
		ctx.fillStyle="black";
		ctx.fillRect(xg1,yg1,65,150);
		xg1=xg;
		yg1=yg;
		ctx.drawImage(ge,xg,yg);
		cnv.addEventListener("click",clkg,false);
	}
}

function clkg(evg){
	
	if(ga==1){
		xg=evg.x;
		yg=evg.y;
		
		//++++++++++++++++++++++++++++++++++++
		// Posicion relativa de equipos
		//____________________________________
		// Transformador + Generador
		if(rn==0){
			if(tn==1){
				if(yg>ytf){
					xgf=xtf;
					ygf=ytf+150;
					ctx.fillStyle="black";
					ctx.fillRect(xg,yg,65,150);
					ctx.drawImage(ge,xgf,ygf);
					p="T+G";
				}
			}
		}
		
		//____________________________________
		// Red + Generador
		if(rn==1){
			if(tn==0){
				if(yg>yrf){
					xgf=xrf;
					ygf=yrf+150;
					ctx.fillStyle="black";
					ctx.fillRect(xg,yg,65,150);
					ctx.drawImage(ge,xgf,ygf);
					p="R+G"
				}
			}
		}
		
		//____________________________________
		// Red + Transformador + Generador
		if(rn==1){
			if(tn==1){
				if(yg>ytf){
					xgf=xtf;
					ygf=ytf+150;
					ctx.fillStyle="black";
					ctx.fillRect(xg,yg,65,150);
					ctx.drawImage(ge,xgf,ygf);
					p="R+T+G";
				}
			}
		}
		
		//____________________________________
		// Solo Gen
		if(rn==0){
			if(tn==0){
					xgf=xg;
					ygf=yg;
					ctx.fillStyle="black";
					ctx.fillRect(xg,yg,65,150);
					ctx.drawImage(ge,xgf,ygf);
					p="G";
			}
		}
		
		sg=parseFloat(prompt("Potencia aparente [kVA]","1250"));
		ug=parseFloat(prompt("Tension del generador [kV]","0.4"));
		x1=parseFloat(prompt("Reactancia de secuencia + [pu]","0.12"));
		x2=parseFloat(prompt("Reactancia de secuencia - [pu]","0.11"));
		x0=parseFloat(prompt("Reactancia de secuencia 0 [pu]","0.08"));
		
	}
	
	
	ga=0;
	
}

// **************************************************************************

// **************************************************************************
//----------------				RED 			---------------------
// Inserta Transformador e ingresa las variables
// uk: tension de Cortocircuito
// st: potencia aparente nominal del trafo
// up: tension primaria
// us: tension secundaria
function redi(){
	if(rn==0){
		cnv.addEventListener("mousemove",mre,false);
		rn=1;
		ra=1;
	}
	
}

function mre(er){
	xr=er.x;
	yr=er.y;

	if(ra==1){
		ctx.fillStyle="black";
		ctx.fillRect(xr1,yr1,65,150);
		xr1=xr;
		yr1=yr;
		ctx.drawImage(re,xr,yr);
		cnv.addEventListener("click",clkr,false);
	}
}

function clkr(evr){
	
	if(ra==1){
		xr=evr.x;
		yr=evr.y;
		//++++++++++++++++++++++++++++++++++
		// Acomoda la red
		// _________________________________
		// Red + generador
		if(gn==1){
			if(tn==0){
				if(ygf>yr){
					yrf=ygf-150;
					xrf=xgf;
					p="R+G";
					ctx.fillStyle="black";
					ctx.fillRect(xr,yr,65,150);
					ctx.drawImage(re,xrf,yrf);
				}
			}
		}
		// _________________________________
		// Transformador + RED
		if(gn==0){
			if(tn==1){
				if(ytf>yr){
					yrf=ytf-150;
					xrf=xtf;
					p="R+T";
					ctx.fillStyle="black";
					ctx.fillRect(xr,yr,65,150);
					ctx.drawImage(re,xrf,yrf);
				}
			}
		}
		
		// _________________________________
		// Red
		if(gn==0){
			if(tn==0){
					yrf=yr;
					xrf=xr;
					p="R";
					ctx.fillStyle="black";
					ctx.fillRect(xr,yr,65,150);
					ctx.drawImage(re,xrf,yrf);
			}
		}
		
		sk3=parseFloat(prompt("Potencia de falla trifasica [MVA]","330"));
		sk1=parseFloat(prompt("Potencia de falla monofasica [MVA]","145"));
		ur=parseFloat(prompt("Tension [kV]","33"));
	}
	
	
	ra=0;	//tourn off switch
	
	
}

// **************************************************************************
// Seccion de calculos
// --------------------------------------------------------------------------

function cal(){
	if(gn==1){
		MVA1g=sg/(x1*1000);
		MVA2g=sg/(x2*1000);
		MVA0g=sg/(x0*1000);
	}

	if(tn==1){
		MVAt=st/(uk*10);
	}

	if(rn==1){
		MVA1r=sk3;
		MVA2r=sk3;
		MVA0r=1/((3/sk1)-(2/MVA1r));
	}

	ctx.fillStyle="red";
	ctx.font="10pt arial"
//++++++++++++++++++++++++++++++++++++++++++++++++
// Solo RED
	if(p=="R"){
		sk3p=sk3;
		ik3p=(sk3/(1.73*ur));
		sk1p=sk1;
		ik1p=sk1/(1.73*ur);
	
		ctx.fillText("Sk3= "+sk3+" MVA",xrf+60,yrf+150,50);
		ctx.fillText("Ik3= "+ik3p.toFixed(2)+" kA",xrf+60,yrf+170,50)
		ctx.fillText("Sk1= "+sk1+" MVA",xrf+60,yrf+195,50);
		ctx.fillText("Ik1= "+ik1p.toFixed(2)+" kA",xrf+60,yrf+215,50)
	}
	//................................................
	
	//++++++++++++++++++++++++++++++++++++++++++++++++
// Solo Generador
	if(p=="G"){
		sk3s=MVA1g;
		ik3s=(sk3s/(1.73*ug));
		sk1s=3*((1/MVA1g)+(1/MVA2g)+(1/MVA0g));
		ik1s=sk1s/(1.73*ug);
	
		ctx.fillText("Sk3= "+sk3s.toFixed(2)+" MVA",xgf+60,ygf+15,90);
		ctx.fillText("Ik3= "+ik3s.toFixed(2)+" kA",xgf+60,ygf+35,90);
		ctx.fillText("Sk1= "+sk1s.toFixed(2)+" MVA",xgf+60,ygf+60,90);
		ctx.fillText("Ik1= "+ik1s.toFixed(2)+" kA",xgf+60,ygf+80,90);
	}
	//................................................
	
	//++++++++++++++++++++++++++++++++++++++++++++++++
//  RED + Transformador
	if(p=="R+T"){
	//::::::::::::::::::::::::::::::::::::::::::::::::
	// Conexiones del transformador
	// Conexion Dyn
		if(ct=="Dyn"){
			sk3p=sk3;
			ik3p=(sk3/(1.73*ur));
				sk1p=sk1;
			ik1p=sk1/(1.73*ur);
		
			sk3s=1/((1/sk3)+(1/MVAt));
			ik3s=(sk3s/(1.73*us));
			sk1s=3/((1/MVA1r)+(1/MVA2r)+(3/MVAt));
			ik1s=sk1s/(1.73*us);
		}
		//------------------XXXX----------------------
		
		//::::::::::::::::::::::::::::::::::::::::::::::::
	// Conexiones del transformador
	// Conexion Yyn
		if(ct=="Yyn"){
			sk3p=sk3;
			ik3p=(sk3/(1.73*ur));
				sk1p=sk1;
			ik1p=sk1/(1.73*ur);
		
			sk3s=1/((1/sk3)+(1/MVAt));
			ik3s=(sk3s/(1.73*us));
			sk1s=3/((1/MVA1r)+(1/MVA2r)+(3/MVAt));
			ik1s=sk1s/(1.73*us);
		}
		//------------------XXXX----------------------
		
		//::::::::::::::::::::::::::::::::::::::::::::::::
	// Conexiones del transformador
	// Conexion YNyn
		if(ct=="YNyn"){
			sk3p=sk3;
			ik3p=(sk3/(1.73*ur));
				sk1p=sk1;
			ik1p=sk1/(1.73*ur);
		
			sk3s=1/((1/sk3)+(1/MVAt));
			ik3s=(sk3s/(1.73*us));
			sk1s=3/((1/MVA1r)+(1/MVA2r)+(1/MVA0r)+(3/MVAt));
			ik1s=sk1s/(1.73*us);
		}
		//------------------XXXX----------------------
		
		//::::::::::::::::::::::::::::::::::::::::::::::::
		ctx.fillText("Sk3= "+sk3+" MVA",xrf+60,yrf+150,90);
		ctx.fillText("Ik3= "+ik3p.toFixed(2)+" kA",xrf+60,yrf+170,90)
		ctx.fillText("Sk1= "+sk1+" MVA",xrf+60,yrf+195,90);
		ctx.fillText("Ik1= "+ik1p.toFixed(2)+" kA",xrf+60,yrf+215,90)
		
		ctx.fillText("Sk3= "+sk3s.toFixed(2)+" MVA",xtf+60,ytf+150,90);
		ctx.fillText("Ik3= "+ik3s.toFixed(2)+" kA",xrf+60,ytf+170,90)
		ctx.fillText("Sk1= "+sk1s.toFixed(2)+" MVA",xrf+60,ytf+195,90);
		ctx.fillText("Ik1= "+ik1s.toFixed(2)+" kA",xrf+60,ytf+215,90)
	}
	//................................................
	
	//++++++++++++++++++++++++++++++++++++++++++++++++
//  RED + Generador
	if(p=="R+G"){
		sk3p=sk3+MVA1g;
		ik3p=(sk3p/(1.73*ur));
		sk1p=sk1+(3/((1/MVA0g)+(1/MVA1g)+(1/MVA2g)));
		ik1p=sk1p/(1.73*ur);
		
		ctx.fillText("Sk3= "+sk3p+" MVA",xrf+60,yrf+150,90);
		ctx.fillText("Ik3= "+ik3p.toFixed(2)+" kA",xrf+60,yrf+170,90)
		ctx.fillText("Sk1= "+sk1p+" MVA",xrf+60,yrf+195,90);
		ctx.fillText("Ik1= "+ik1p.toFixed(2)+" kA",xrf+60,yrf+215,90)

	}
	//................................................
	
	
		//++++++++++++++++++++++++++++++++++++++++++++++++
//  RED + Transformador + Generador
	if(p=="R+T+G"){
		
		//::::::::::::::::::::::::::::::::::::::::::::::::
	// Conexiones del transformador
	// Conexion YNd
		if(ct=="YNd"){
			sk3p=sk3+(1/((1/MVAt)+(1/MVA1g)));
			ik3p=(sk3p/(1.73*ur));
			sk1p=sk1+(3/((3/MVAt)+(1/MVA1g)+(1/MVA2g)));
			ik1p=sk1/(1.73*ur);
		
			sk3s=1/((1/sk3)+(1/MVAt));
			ik3s=(sk3s/(1.73*us));
			sk1s=0
			ik1s=0
		}
	// -----------------XXXX----------------------
	
	// Conexiones del transformador
	// Conexion Dyn
		if(ct=="Dyn"){
			sk3p=sk3+(1/((1/MVAt)+(1/MVA1g)));
			ik3p=(sk3p/(1.73*ur));
			sk1p=sk1;
			ik1p=sk1/(1.73*ur);
		
			sk3s=1/((1/sk3)+(1/MVAt));
			ik3s=(sk3s/(1.73*us));
			sk1s=3/((1/MVA1r)+(1/MVA2r)+(3/MVAt))+(3/((1/MVA0g)+(1/MVA1g)+(1/MVA2g)));
			ik1s=sk1s/(1.73*us);
		}
	// -----------------XXXX----------------------
	
	// -----------------XXXX----------------------
	
	// Conexiones del transformador
	// Conexion Yy
		if(ct=="Yy"){
			sk3p=sk3+(1/((1/MVAt)+(1/MVA1g)));
			ik3p=(sk3p/(1.73*ur));
			sk1p=sk1;
			ik1p=sk1p/(1.73*ur);
		
			sk3s=1/((1/sk3)+(1/MVAt));
			ik3s=(sk3s/(1.73*us));
			sk1s=(3/((1/MVA0g)+(1/MVA1g)+(1/MVA2g)));
			ik1s=sk1s/(1.73*us);
		}
	// -----------------XXXX----------------------
	
	// Conexiones del transformador
	// Conexion YNyn
		if(ct=="YNyn"){
			sk3p=sk3+(1/((1/MVAt)+(1/MVA1g)));
			ik3p=(sk3p/(1.73*ur));
			sk1p=sk1+(3/((1/MVA0g)+(1/MVA1g)+(1/MVA2g)));
			ik1p=sk1p/(1.73*ur);
		
			sk3s=1/((1/sk3)+(1/MVAt));
			ik3s=(sk3s/(1.73*us));
			sk1s=3/((1/MVA1)+(1/MVA2r)+(1/MVA0r)+(3/MVAt))+(3/((1/MVA0g)+(1/MVA1g)+(1/MVA2g)));
			ik1s=sk1s/(1.73*us);
		}
	// -----------------XXXX----------------------
		
		ctx.fillText("Sk3= "+sk3p.toFixed(2)+" MVA",xrf+60,yrf+150,90);
		ctx.fillText("Ik3= "+ik3p.toFixed(2)+" kA",xrf+60,yrf+170,90)
		ctx.fillText("Sk1= "+sk1p.toFixed(2)+" MVA",xrf+60,yrf+195,90);
		ctx.fillText("Ik1= "+ik1p.toFixed(2)+" kA",xrf+60,yrf+215,90)
		
		ctx.fillText("Sk3= "+sk3s.toFixed(2)+" MVA",xtf+60,ytf+150,90);
		ctx.fillText("Ik3= "+ik3s.toFixed(2)+" kA",xrf+60,ytf+170,90)
		ctx.fillText("Sk1= "+sk1s.toFixed(2)+" MVA",xrf+60,ytf+195,90);
		ctx.fillText("Ik1= "+ik1s.toFixed(2)+" kA",xrf+60,ytf+215,90)
	}
	//................................................



		//++++++++++++++++++++++++++++++++++++++++++++++++
//  Transformador + Generador
	if(p=="T+G"){
		
		//::::::::::::::::::::::::::::::::::::::::::::::::
	// Conexiones del transformador
	// Conexion YNd
		if(ct=="YNd"){
			sk3p=(1/((1/MVAt)+(1/MVA1g)));
			ik3p=(sk3p/(1.73*up));
			sk1p=(3/((3/MVAt)+(1/MVA1g)+(1/MVA2g)));
			ik1p=sk1p/(1.73*up);
		
			sk3s=MVA1g;
			ik3s=(sk3s/(1.73*us));
			sk1s=3/((1/MVA0g)+(1/MVA1g)+(1/MVA2g));
			ik1s=(sk1s/(1.73*us));
		}
	// -----------------XXXX----------------------
	
	// Conexiones del transformador
	// Conexion Dyn
		if(ct=="Dyn"){
			sk3p=(1/((1/MVAt)+(1/MVA1g)));
			ik3p=(sk3p/(1.73*up));
			sk1p=0;
			ik1p=sk1p/(1.73*up);
		
			sk3s=MVA1g;
			ik3s=(sk3s/(1.73*us));
			sk1s=(3/((1/MVA0g)+(1/MVA1g)+(1/MVA2g)));
			ik1s=sk1s/(1.73*us);
		}
	// -----------------XXXX----------------------
	
	// -----------------XXXX----------------------
	
	// Conexiones del transformador
	// Conexion Yy
		if(ct=="Yy"){
			sk3p=(1/((1/MVAt)+(1/MVA1g)));
			ik3p=(sk3p/(1.73*up));
			sk1p=0;
			ik1p=sk1p/(1.73*up);
		
			sk3s=MVA1g;
			ik3s=(sk3s/(1.73*us));
			sk1s=(3/((1/MVA0g)+(1/MVA1g)+(1/MVA2g)));
			ik1s=sk1s/(1.73*us);
		}
	// -----------------XXXX----------------------
	
	// Conexiones del transformador
	// Conexion YNyn
		if(ct=="YNyn"){
			sk3p=(1/((1/MVAt)+(1/MVA1g)));
			ik3p=(sk3p/(1.73*ur));
			sk1p=(3/((1/MVA0g)+(1/MVA1g)+(1/MVA2g)+(3/MVAt)));
			ik1p=sk1p/(1.73*ur);
		
			sk3s=MVA1g;
			ik3s=(sk3s/(1.73*us));
			sk1s=(3/((1/MVA0g)+(1/MVA1g)+(1/MVA2g)));
			ik1s=sk1s/(1.73*us);
		}
	// -----------------XXXX----------------------
		
		ctx.fillText("Sk3= "+sk3p.toFixed(2)+" MVA",xtf+60,ytf+15,90);
		ctx.fillText("Ik3= "+ik3p.toFixed(2)+" kA",xtf+60,ytf+35,90)
		ctx.fillText("Sk1= "+sk1p.toFixed(2)+" MVA",xtf+60,ytf+60,90);
		ctx.fillText("Ik1= "+ik1p.toFixed(2)+" kA",xtf+60,ytf+80,90)
		
		ctx.fillText("Sk3= "+sk3s.toFixed(2)+" MVA",xtf+60,ytf+150,90);
		ctx.fillText("Ik3= "+ik3s.toFixed(2)+" kA",xtf+60,ytf+170,90)
		ctx.fillText("Sk1= "+sk1s.toFixed(2)+" MVA",xtf+60,ytf+195,90);
		ctx.fillText("Ik1= "+ik1s.toFixed(2)+" kA",xtf+60,ytf+215,90)
	}
	//................................................
}

function cred(){
	alert("Esta es la version 1.0 del calculador de Cortocircuito grafico - Fue terminada el 23/04/2022 - Alberto G. Martinez - Ingeniero Electricista - UTN FRRo ");
}


