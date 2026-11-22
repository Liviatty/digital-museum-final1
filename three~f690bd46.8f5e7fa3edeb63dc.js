"use strict";(self.webpackChunkprototype=self.webpackChunkprototype||[]).push([["663"],{6797(e,t,r){r.d(t,{p:()=>c}),r(7378);var i=r(9874),n=r(7710),a=r(3614),o=r(1794);let s=null,l="https://www.gstatic.com/draco/versioned/decoders/1.5.5/";function u(e=!0,t=!0,r){return a=>{r&&r(a),e&&(s||(s=new i.Z),s.setDecoderPath("string"==typeof e?e:l),a.setDRACOLoader(s)),t&&a.setMeshoptDecoder("function"==typeof n.f?(0,n.f)():n.f)}}let c=(e,t,r,i)=>(0,o.H)(a.B,e,u(t,r,i));c.preload=(e,t,r,i)=>o.H.preload(a.B,e,u(t,r,i)),c.clear=e=>o.H.clear(a.B,e),c.setDecoderPath=e=>{l=e}},5e3(e,t,r){r.d(t,{d:()=>h});var i=r(8102),n=r(7378),a=r(5184),o=r(1794);let s=parseInt("187".replace(/\D+/g,""));class l extends a.BKk{constructor(e=new a.I9Y){super({uniforms:{inputBuffer:new a.nc$(null),depthBuffer:new a.nc$(null),resolution:new a.nc$(new a.I9Y),texelSize:new a.nc$(new a.I9Y),halfTexelSize:new a.nc$(new a.I9Y),kernel:new a.nc$(0),scale:new a.nc$(1),cameraNear:new a.nc$(0),cameraFar:new a.nc$(1),minDepthThreshold:new a.nc$(0),maxDepthThreshold:new a.nc$(1),depthScale:new a.nc$(0),depthToBlurRatioBias:new a.nc$(.25)},fragmentShader:`#include <common>
        #include <dithering_pars_fragment>      
        uniform sampler2D inputBuffer;
        uniform sampler2D depthBuffer;
        uniform float cameraNear;
        uniform float cameraFar;
        uniform float minDepthThreshold;
        uniform float maxDepthThreshold;
        uniform float depthScale;
        uniform float depthToBlurRatioBias;
        varying vec2 vUv;
        varying vec2 vUv0;
        varying vec2 vUv1;
        varying vec2 vUv2;
        varying vec2 vUv3;

        void main() {
          float depthFactor = 0.0;
          
          #ifdef USE_DEPTH
            vec4 depth = texture2D(depthBuffer, vUv);
            depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
            depthFactor *= depthScale;
            depthFactor = max(0.0, min(1.0, depthFactor + 0.25));
          #endif
          
          vec4 sum = texture2D(inputBuffer, mix(vUv0, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv1, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv2, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv3, vUv, depthFactor));
          gl_FragColor = sum * 0.25 ;

          #include <dithering_fragment>
          #include <tonemapping_fragment>
          #include <${s>=154?"colorspace_fragment":"encodings_fragment"}>
        }`,vertexShader:`uniform vec2 texelSize;
        uniform vec2 halfTexelSize;
        uniform float kernel;
        uniform float scale;
        varying vec2 vUv;
        varying vec2 vUv0;
        varying vec2 vUv1;
        varying vec2 vUv2;
        varying vec2 vUv3;

        void main() {
          vec2 uv = position.xy * 0.5 + 0.5;
          vUv = uv;

          vec2 dUv = (texelSize * vec2(kernel) + halfTexelSize) * scale;
          vUv0 = vec2(uv.x - dUv.x, uv.y + dUv.y);
          vUv1 = vec2(uv.x + dUv.x, uv.y + dUv.y);
          vUv2 = vec2(uv.x + dUv.x, uv.y - dUv.y);
          vUv3 = vec2(uv.x - dUv.x, uv.y - dUv.y);

          gl_Position = vec4(position.xy, 1.0, 1.0);
        }`,blending:0,depthWrite:!1,depthTest:!1}),this.toneMapped=!1,this.setTexelSize(e.x,e.y),this.kernel=new Float32Array([0,1,2,2,3])}setTexelSize(e,t){this.uniforms.texelSize.value.set(e,t),this.uniforms.halfTexelSize.value.set(e,t).multiplyScalar(.5)}setResolution(e){this.uniforms.resolution.value.copy(e)}}class u{constructor({gl:e,resolution:t,width:r=500,height:i=500,minDepthThreshold:n=0,maxDepthThreshold:o=1,depthScale:s=0,depthToBlurRatioBias:u=.25}){this.renderToScreen=!1,this.renderTargetA=new a.nWS(t,t,{minFilter:1006,magFilter:1006,stencilBuffer:!1,depthBuffer:!1,type:1016}),this.renderTargetB=this.renderTargetA.clone(),this.convolutionMaterial=new l,this.convolutionMaterial.setTexelSize(1/r,1/i),this.convolutionMaterial.setResolution(new a.I9Y(r,i)),this.scene=new a.Z58,this.camera=new a.i7d,this.convolutionMaterial.uniforms.minDepthThreshold.value=n,this.convolutionMaterial.uniforms.maxDepthThreshold.value=o,this.convolutionMaterial.uniforms.depthScale.value=s,this.convolutionMaterial.uniforms.depthToBlurRatioBias.value=u,this.convolutionMaterial.defines.USE_DEPTH=s>0;const c=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),h=new Float32Array([0,0,2,0,0,2]),f=new a.LoY;f.setAttribute("position",new a.THS(c,3)),f.setAttribute("uv",new a.THS(h,2)),this.screen=new a.eaF(f,this.convolutionMaterial),this.screen.frustumCulled=!1,this.scene.add(this.screen)}render(e,t,r){let i,n,a,o=this.scene,s=this.camera,l=this.renderTargetA,u=this.renderTargetB,c=this.convolutionMaterial,h=c.uniforms;h.depthBuffer.value=t.depthTexture;let f=c.kernel,d=t;for(n=0,a=f.length-1;n<a;++n)i=(1&n)==0?l:u,h.kernel.value=f[n],h.inputBuffer.value=d.texture,e.setRenderTarget(i),e.render(o,s),d=i;h.kernel.value=f[n],h.inputBuffer.value=d.texture,e.setRenderTarget(this.renderToScreen?null:r),e.render(o,s)}}class c extends a._4j{constructor(e={}){super(e),this._tDepth={value:null},this._distortionMap={value:null},this._tDiffuse={value:null},this._tDiffuseBlur={value:null},this._textureMatrix={value:null},this._hasBlur={value:!1},this._mirror={value:0},this._mixBlur={value:0},this._blurStrength={value:.5},this._minDepthThreshold={value:.9},this._maxDepthThreshold={value:1},this._depthScale={value:0},this._depthToBlurRatioBias={value:.25},this._distortion={value:1},this._mixContrast={value:1},this.setValues(e)}onBeforeCompile(e){var t;null!=(t=e.defines)&&t.USE_UV||(e.defines.USE_UV=""),e.uniforms.hasBlur=this._hasBlur,e.uniforms.tDiffuse=this._tDiffuse,e.uniforms.tDepth=this._tDepth,e.uniforms.distortionMap=this._distortionMap,e.uniforms.tDiffuseBlur=this._tDiffuseBlur,e.uniforms.textureMatrix=this._textureMatrix,e.uniforms.mirror=this._mirror,e.uniforms.mixBlur=this._mixBlur,e.uniforms.mixStrength=this._blurStrength,e.uniforms.minDepthThreshold=this._minDepthThreshold,e.uniforms.maxDepthThreshold=this._maxDepthThreshold,e.uniforms.depthScale=this._depthScale,e.uniforms.depthToBlurRatioBias=this._depthToBlurRatioBias,e.uniforms.distortion=this._distortion,e.uniforms.mixContrast=this._mixContrast,e.vertexShader=`
        uniform mat4 textureMatrix;
        varying vec4 my_vUv;
      ${e.vertexShader}`,e.vertexShader=e.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
        my_vUv = textureMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );`),e.fragmentShader=`
        uniform sampler2D tDiffuse;
        uniform sampler2D tDiffuseBlur;
        uniform sampler2D tDepth;
        uniform sampler2D distortionMap;
        uniform float distortion;
        uniform float cameraNear;
			  uniform float cameraFar;
        uniform bool hasBlur;
        uniform float mixBlur;
        uniform float mirror;
        uniform float mixStrength;
        uniform float minDepthThreshold;
        uniform float maxDepthThreshold;
        uniform float mixContrast;
        uniform float depthScale;
        uniform float depthToBlurRatioBias;
        varying vec4 my_vUv;
        ${e.fragmentShader}`,e.fragmentShader=e.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>

      float distortionFactor = 0.0;
      #ifdef USE_DISTORTION
        distortionFactor = texture2D(distortionMap, vUv).r * distortion;
      #endif

      vec4 new_vUv = my_vUv;
      new_vUv.x += distortionFactor;
      new_vUv.y += distortionFactor;

      vec4 base = texture2DProj(tDiffuse, new_vUv);
      vec4 blur = texture2DProj(tDiffuseBlur, new_vUv);

      vec4 merge = base;

      #ifdef USE_NORMALMAP
        vec2 normal_uv = vec2(0.0);
        vec4 normalColor = texture2D(normalMap, vUv * normalScale);
        vec3 my_normal = normalize( vec3( normalColor.r * 2.0 - 1.0, normalColor.b,  normalColor.g * 2.0 - 1.0 ) );
        vec3 coord = new_vUv.xyz / new_vUv.w;
        normal_uv = coord.xy + coord.z * my_normal.xz * 0.05;
        vec4 base_normal = texture2D(tDiffuse, normal_uv);
        vec4 blur_normal = texture2D(tDiffuseBlur, normal_uv);
        merge = base_normal;
        blur = blur_normal;
      #endif

      float depthFactor = 0.0001;
      float blurFactor = 0.0;

      #ifdef USE_DEPTH
        vec4 depth = texture2DProj(tDepth, new_vUv);
        depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
        depthFactor *= depthScale;
        depthFactor = max(0.0001, min(1.0, depthFactor));

        #ifdef USE_BLUR
          blur = blur * min(1.0, depthFactor + depthToBlurRatioBias);
          merge = merge * min(1.0, depthFactor + 0.5);
        #else
          merge = merge * depthFactor;
        #endif

      #endif

      float reflectorRoughnessFactor = roughness;
      #ifdef USE_ROUGHNESSMAP
        vec4 reflectorTexelRoughness = texture2D( roughnessMap, vUv );
        reflectorRoughnessFactor *= reflectorTexelRoughness.g;
      #endif

      #ifdef USE_BLUR
        blurFactor = min(1.0, mixBlur * reflectorRoughnessFactor);
        merge = mix(merge, blur, blurFactor);
      #endif

      vec4 newMerge = vec4(0.0, 0.0, 0.0, 1.0);
      newMerge.r = (merge.r - 0.5) * mixContrast + 0.5;
      newMerge.g = (merge.g - 0.5) * mixContrast + 0.5;
      newMerge.b = (merge.b - 0.5) * mixContrast + 0.5;

      diffuseColor.rgb = diffuseColor.rgb * ((1.0 - min(1.0, mirror)) + newMerge.rgb * mixStrength);
      `)}get tDiffuse(){return this._tDiffuse.value}set tDiffuse(e){this._tDiffuse.value=e}get tDepth(){return this._tDepth.value}set tDepth(e){this._tDepth.value=e}get distortionMap(){return this._distortionMap.value}set distortionMap(e){this._distortionMap.value=e}get tDiffuseBlur(){return this._tDiffuseBlur.value}set tDiffuseBlur(e){this._tDiffuseBlur.value=e}get textureMatrix(){return this._textureMatrix.value}set textureMatrix(e){this._textureMatrix.value=e}get hasBlur(){return this._hasBlur.value}set hasBlur(e){this._hasBlur.value=e}get mirror(){return this._mirror.value}set mirror(e){this._mirror.value=e}get mixBlur(){return this._mixBlur.value}set mixBlur(e){this._mixBlur.value=e}get mixStrength(){return this._blurStrength.value}set mixStrength(e){this._blurStrength.value=e}get minDepthThreshold(){return this._minDepthThreshold.value}set minDepthThreshold(e){this._minDepthThreshold.value=e}get maxDepthThreshold(){return this._maxDepthThreshold.value}set maxDepthThreshold(e){this._maxDepthThreshold.value=e}get depthScale(){return this._depthScale.value}set depthScale(e){this._depthScale.value=e}get depthToBlurRatioBias(){return this._depthToBlurRatioBias.value}set depthToBlurRatioBias(e){this._depthToBlurRatioBias.value=e}get distortion(){return this._distortion.value}set distortion(e){this._distortion.value=e}get mixContrast(){return this._mixContrast.value}set mixContrast(e){this._mixContrast.value=e}}let h=n.forwardRef(({mixBlur:e=0,mixStrength:t=1,resolution:r=256,blur:s=[0,0],minDepthThreshold:l=.9,maxDepthThreshold:h=1,depthScale:f=0,depthToBlurRatioBias:d=.25,mirror:p=0,distortion:m=1,mixContrast:v=1,distortionMap:g,reflectorOffset:_=0,...x},b)=>{(0,o.e)({MeshReflectorMaterialImpl:c});let w=(0,o.D)(({gl:e})=>e),M=(0,o.D)(({camera:e})=>e),T=(0,o.D)(({scene:e})=>e),S=(s=Array.isArray(s)?s:[s,s])[0]+s[1]>0,y=n.useRef(null);n.useImperativeHandle(b,()=>y.current,[]);let[C]=n.useState(()=>new a.Zcv),[P]=n.useState(()=>new a.Pq0),[D]=n.useState(()=>new a.Pq0),[E]=n.useState(()=>new a.Pq0),[B]=n.useState(()=>new a.kn4),[U]=n.useState(()=>new a.Pq0(0,0,-1)),[R]=n.useState(()=>new a.IUQ),[A]=n.useState(()=>new a.Pq0),[F]=n.useState(()=>new a.Pq0),[O]=n.useState(()=>new a.IUQ),[I]=n.useState(()=>new a.kn4),[j]=n.useState(()=>new a.ubm),z=n.useCallback(()=>{var e;let t=y.current.parent||(null==(e=y.current)?void 0:e.__r3f.parent);if(!t||(D.setFromMatrixPosition(t.matrixWorld),E.setFromMatrixPosition(M.matrixWorld),B.extractRotation(t.matrixWorld),P.set(0,0,1),P.applyMatrix4(B),D.addScaledVector(P,_),A.subVectors(D,E),A.dot(P)>0))return;A.reflect(P).negate(),A.add(D),B.extractRotation(M.matrixWorld),U.set(0,0,-1),U.applyMatrix4(B),U.add(E),F.subVectors(D,U),F.reflect(P).negate(),F.add(D),j.position.copy(A),j.up.set(0,1,0),j.up.applyMatrix4(B),j.up.reflect(P),j.lookAt(F),j.far=M.far,j.updateMatrixWorld(),j.projectionMatrix.copy(M.projectionMatrix),I.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),I.multiply(j.projectionMatrix),I.multiply(j.matrixWorldInverse),I.multiply(t.matrixWorld),C.setFromNormalAndCoplanarPoint(P,D),C.applyMatrix4(j.matrixWorldInverse),R.set(C.normal.x,C.normal.y,C.normal.z,C.constant);let r=j.projectionMatrix;O.x=(Math.sign(R.x)+r.elements[8])/r.elements[0],O.y=(Math.sign(R.y)+r.elements[9])/r.elements[5],O.z=-1,O.w=(1+r.elements[10])/r.elements[14],R.multiplyScalar(2/R.dot(O)),r.elements[2]=R.x,r.elements[6]=R.y,r.elements[10]=R.z+1,r.elements[14]=R.w},[M,_]),[k,L,N,H]=n.useMemo(()=>{let i={minFilter:1006,magFilter:1006,type:1016},n=new a.nWS(r,r,i);n.depthBuffer=!0,n.depthTexture=new a.VCu(r,r),n.depthTexture.format=1026,n.depthTexture.type=1012;let o=new a.nWS(r,r,i),c=new u({gl:w,resolution:r,width:s[0],height:s[1],minDepthThreshold:l,maxDepthThreshold:h,depthScale:f,depthToBlurRatioBias:d}),_={mirror:p,textureMatrix:I,mixBlur:e,tDiffuse:n.texture,tDepth:n.depthTexture,tDiffuseBlur:o.texture,hasBlur:S,mixStrength:t,minDepthThreshold:l,maxDepthThreshold:h,depthScale:f,depthToBlurRatioBias:d,distortion:m,distortionMap:g,mixContrast:v,"defines-USE_BLUR":S?"":void 0,"defines-USE_DEPTH":f>0?"":void 0,"defines-USE_DISTORTION":g?"":void 0};return[n,o,c,_]},[w,s,I,r,p,S,e,t,l,h,f,d,m,g,v]);return(0,o.F)(()=>{var e;let t=y.current.parent||(null==(e=y.current)?void 0:e.__r3f.parent);if(!t)return;t.visible=!1;let r=w.xr.enabled,i=w.shadowMap.autoUpdate;z(),w.xr.enabled=!1,w.shadowMap.autoUpdate=!1,w.setRenderTarget(k),w.state.buffers.depth.setMask(!0),w.autoClear||w.clear(),w.render(T,j),S&&N.render(w,k,L),w.xr.enabled=r,w.shadowMap.autoUpdate=i,t.visible=!0,w.setRenderTarget(null)}),n.createElement("meshReflectorMaterialImpl",(0,i.A)({attach:"material",key:"key"+H["defines-USE_BLUR"]+H["defines-USE_DEPTH"]+H["defines-USE_DISTORTION"],ref:y},H,x))})},4167(e,t,r){r.d(t,{p:()=>o}),r(7378);var i=r(5184),n=r(8340);let a=0,o=(0,n.vt)(e=>(i.h_9.onStart=(t,r,i)=>{e({active:!0,item:t,loaded:r,total:i,progress:(r-a)/(i-a)*100})},i.h_9.onLoad=()=>{e({active:!1})},i.h_9.onError=t=>e(e=>({errors:[...e.errors,t]})),i.h_9.onProgress=(t,r,i)=>{r===i&&(a=i),e({active:!0,item:t,loaded:r,total:i,progress:(r-a)/(i-a)*100||100})},{errors:[],active:!1,progress:0,item:"",loaded:0,total:0}))},9769(e,t,r){r.d(t,{zo:()=>s});var i=r(7378),n=r(5184),a=r(1794);let o=e=>e===Object(e)&&!Array.isArray(e)&&"function"!=typeof e;function s(e,t){let r=(0,a.D)(e=>e.gl),s=(0,a.H)(n.Tap,o(e)?Object.values(e):e);return(0,i.useLayoutEffect)(()=>{null==t||t(s)},[t]),(0,i.useEffect)(()=>{if("initTexture"in r){let e=[];Array.isArray(s)?e=s:s instanceof n.gPd?e=[s]:o(s)&&(e=Object.values(s)),e.forEach(e=>{e instanceof n.gPd&&r.initTexture(e)})}},[r,s]),(0,i.useMemo)(()=>{if(!o(e))return s;{let t={},r=0;for(let i in e)t[i]=s[r++];return t}},[e,s])}s.preload=e=>a.H.preload(n.Tap,e),s.clear=e=>a.H.clear(n.Tap,e)},1794(e,t,r){let i,n,a;r.d(t,{B:()=>y,D:()=>ee,E:()=>C,F:()=>et,H:()=>en,a:()=>T,b:()=>eh,c:()=>em,d:()=>ed,e:()=>x,i:()=>M,u:()=>S});var o,s,l=r(5184),u=r(9451),c=r(7378),h=r(3344),f=r(8340),d=r(7385),p=r(8284),m=r(7369),v=r.n(m),g=r(1434);let _={},x=e=>void Object.assign(_,e),b=e=>"colorSpace"in e||"outputColorSpace"in e,w=()=>{var e;return null!=(e=_.ColorManagement)?e:null},M=e=>e&&e.hasOwnProperty("current"),T="u">typeof window&&(null!=(o=window.document)&&o.createElement||(null==(s=window.navigator)?void 0:s.product)==="ReactNative")?c.useLayoutEffect:c.useEffect;function S(e){let t=c.useRef(e);return T(()=>void(t.current=e),[e]),t}function y({set:e}){return T(()=>(e(new Promise(()=>null)),()=>e(!1)),[e]),null}class C extends c.Component{constructor(...e){super(...e),this.state={error:!1}}componentDidCatch(e){this.props.set(e)}render(){return this.state.error?null:this.props.children}}C.getDerivedStateFromError=()=>({error:!0});let P="__default",D=new Map;function E(e){var t;let r="u">typeof window?null!=(t=window.devicePixelRatio)?t:2:1;return Array.isArray(e)?Math.min(Math.max(e[0],r),e[1]):e}let B=e=>{var t;return null==(t=e.__r3f)?void 0:t.root.getState()};function U(e){let t=e.__r3f.root;for(;t.getState().previousRoot;)t=t.getState().previousRoot;return t}let R={obj:e=>e===Object(e)&&!R.arr(e)&&"function"!=typeof e,fun:e=>"function"==typeof e,str:e=>"string"==typeof e,num:e=>"number"==typeof e,boo:e=>"boolean"==typeof e,und:e=>void 0===e,arr:e=>Array.isArray(e),equ(e,t,{arrays:r="shallow",objects:i="reference",strict:n=!0}={}){let a;if(typeof e!=typeof t||!!e!=!!t)return!1;if(R.str(e)||R.num(e)||R.boo(e))return e===t;let o=R.obj(e);if(o&&"reference"===i)return e===t;let s=R.arr(e);if(s&&"reference"===r)return e===t;if((s||o)&&e===t)return!0;for(a in e)if(!(a in t))return!1;if(o&&"shallow"===r&&"shallow"===i){for(a in n?t:e)if(!R.equ(e[a],t[a],{strict:n,objects:"reference"}))return!1}else for(a in n?t:e)if(e[a]!==t[a])return!1;if(R.und(a)){if(s&&0===e.length&&0===t.length||o&&0===Object.keys(e).length&&0===Object.keys(t).length)return!0;if(e!==t)return!1}return!0}};function A(e,t){return e.__r3f={type:"",root:null,previousAttach:null,memoizedProps:{},eventCount:0,handlers:{},objects:[],parent:null,...t},e}function F(e,t){let r=e;if(!t.includes("-"))return{target:r,key:t};{let i=t.split("-"),n=i.pop();return{target:r=i.reduce((e,t)=>e[t],e),key:n}}}let O=/-\d+$/;function I(e,t,r){if(R.str(r)){if(O.test(r)){let{target:t,key:i}=F(e,r.replace(O,""));Array.isArray(t[i])||(t[i]=[])}let{target:i,key:n}=F(e,r);t.__r3f.previousAttach=i[n],i[n]=t}else t.__r3f.previousAttach=r(e,t)}function j(e,t,r){var i,n;if(R.str(r)){let{target:i,key:n}=F(e,r),a=t.__r3f.previousAttach;void 0===a?delete i[n]:i[n]=a}else null==(i=t.__r3f)||null==i.previousAttach||i.previousAttach(e,t);null==(n=t.__r3f)||delete n.previousAttach}function z(e,{children:t,key:r,ref:i,...n},{children:a,key:o,ref:s,...l}={},u=!1){let c=e.__r3f,h=Object.entries(n),f=[];if(u){let e=Object.keys(l);for(let t=0;t<e.length;t++)n.hasOwnProperty(e[t])||h.unshift([e[t],P+"remove"])}h.forEach(([t,r])=>{var i;if(null!=(i=e.__r3f)&&i.primitive&&"object"===t||R.equ(r,l[t]))return;if(/^on(Pointer|Click|DoubleClick|ContextMenu|Wheel)/.test(t))return f.push([t,r,!0,[]]);let a=[];for(let e in t.includes("-")&&(a=t.split("-")),f.push([t,r,!1,a]),n){let r=n[e];e.startsWith(`${t}-`)&&f.push([e,r,!1,e.split("-")])}});let d={...n};return null!=c&&c.memoizedProps&&null!=c&&c.memoizedProps.args&&(d.args=c.memoizedProps.args),null!=c&&c.memoizedProps&&null!=c&&c.memoizedProps.attach&&(d.attach=c.memoizedProps.attach),{memoized:d,changes:f}}let k="u">typeof process&&!1;function L(e,t){var r,i,n;let a=e.__r3f,o=null==a?void 0:a.root,s=null==o||null==o.getState?void 0:o.getState(),{memoized:u,changes:c}=t&&t.memoized&&t.changes?t:z(e,t),h=null==a?void 0:a.eventCount;e.__r3f&&(e.__r3f.memoizedProps=u);for(let t=0;t<c.length;t++){let[r,o,u,h]=c[t];if(b(e)){let e="srgb",t="srgb-linear";"encoding"===r?(r="colorSpace",o=3001===o?e:t):"outputEncoding"===r&&(r="outputColorSpace",o=3001===o?e:t)}let f=e,d=f[r];if(h.length&&!((d=h.reduce((e,t)=>e[t],e))&&d.set)){let[t,...i]=h.reverse();f=i.reverse().reduce((e,t)=>e[t],e),r=t}if(o===P+"remove")if(f.constructor){let e=D.get(f.constructor);e||(e=new f.constructor,D.set(f.constructor,e)),o=e[r]}else o=0;if(u&&a)o?a.handlers[r]=o:delete a.handlers[r],a.eventCount=Object.keys(a.handlers).length;else if(d&&d.set&&(d.copy||d instanceof l.zgK)){if(Array.isArray(o))d.fromArray?d.fromArray(o):d.set(...o);else if(d.copy&&o&&o.constructor&&(k?d.constructor.name===o.constructor.name:d.constructor===o.constructor))d.copy(o);else if(void 0!==o){let e=null==(i=d)?void 0:i.isColor;!e&&d.setScalar?d.setScalar(o):d instanceof l.zgK&&o instanceof l.zgK?d.mask=o.mask:d.set(o),!w()&&s&&!s.linear&&e&&d.convertSRGBToLinear()}}else if(f[r]=o,null!=(n=f[r])&&n.isTexture&&1023===f[r].format&&1009===f[r].type&&s){let e=f[r];b(e)&&b(s.gl)?e.colorSpace=s.gl.outputColorSpace:e.encoding=s.gl.outputEncoding}N(e)}if(a&&a.parent&&e.raycast&&h!==a.eventCount){let t=U(e).getState().internal,r=t.interaction.indexOf(e);r>-1&&t.interaction.splice(r,1),a.eventCount&&t.interaction.push(e)}return(1!==c.length||"onUpdate"!==c[0][0])&&c.length&&null!=(r=e.__r3f)&&r.parent&&H(e),e}function N(e){var t,r;let i=null==(t=e.__r3f)||null==(r=t.root)||null==r.getState?void 0:r.getState();i&&0===i.internal.frames&&i.invalidate()}function H(e){null==e.onUpdate||e.onUpdate(e)}function W(e){return(e.eventObject||e.object).uuid+"/"+e.index+e.instanceId}function Y(e,t,r,i){let n=r.get(t);n&&(r.delete(t),0===r.size&&(e.delete(i),n.target.releasePointerCapture(i)))}let q=e=>!!(null!=e&&e.render),V=c.createContext(null),Q=new Set,G=new Set,$=new Set;function K(e,t){if(e.size)for(let{callback:r}of e.values())r(t)}function X(e,t){switch(e){case"before":return K(Q,t);case"after":return K(G,t);case"tail":return K($,t)}}function Z(e,t,r){let o=t.clock.getDelta();for("never"===t.frameloop&&"number"==typeof e&&(o=e-t.clock.elapsedTime,t.clock.oldTime=t.clock.elapsedTime,t.clock.elapsedTime=e),n=t.internal.subscribers,i=0;i<n.length;i++)(a=n[i]).ref.current(a.store.getState(),o,r);return!t.internal.priority&&t.gl.render&&t.gl.render(t.scene,t.camera),t.internal.frames=Math.max(0,t.internal.frames-1),"always"===t.frameloop?1:t.internal.frames}function J(){let e=c.useContext(V);if(!e)throw Error("R3F: Hooks can only be used within the Canvas component!");return e}function ee(e=e=>e,t){return J()(e,t)}function et(e,t=0){let r=J(),i=r.getState().internal.subscribe,n=S(e);return T(()=>i(n,t,r),[t,i,r]),null}let er=new WeakMap;function ei(e,t){return function(r,...i){let n=er.get(r);return n||(n=new r,er.set(r,n)),e&&e(n),Promise.all(i.map(e=>new Promise((r,i)=>n.load(e,e=>{var t;let i;e.scene&&Object.assign(e,(t=e.scene,i={nodes:{},materials:{}},t&&t.traverse(e=>{e.name&&(i.nodes[e.name]=e),e.material&&!i.materials[e.material.name]&&(i.materials[e.material.name]=e.material)}),i)),r(e)},t,t=>i(Error(`Could not load ${e}: ${null==t?void 0:t.message}`))))))}}function en(e,t,r,i){let n=Array.isArray(t)?t:[t],a=(0,d.DY)(ei(r,i),[e,...n],{equal:R.equ});return Array.isArray(t)?a:a[0]}en.preload=function(e,t,r){let i=Array.isArray(t)?t:[t];return(0,d.uv)(ei(r),[e,...i])},en.clear=function(e,t){let r=Array.isArray(t)?t:[t];return(0,d.IU)([e,...r])};let ea=new Map,{invalidate:eo,advance:es}=function(e){let t,r,i,n=!1,a=!1;function o(s){for(let u of(r=requestAnimationFrame(o),n=!0,t=0,X("before",s),a=!0,e.values())){var l;(i=u.store.getState()).internal.active&&("always"===i.frameloop||i.internal.frames>0)&&!(null!=(l=i.gl.xr)&&l.isPresenting)&&(t+=Z(s,i))}if(a=!1,X("after",s),0===t)return X("tail",s),n=!1,cancelAnimationFrame(r)}return{loop:o,invalidate:function t(r,i=1){var s;if(!r)return e.forEach(e=>t(e.store.getState(),i));(null==(s=r.gl.xr)||!s.isPresenting)&&r.internal.active&&"never"!==r.frameloop&&(i>1?r.internal.frames=Math.min(60,r.internal.frames+i):a?r.internal.frames=2:r.internal.frames=1,n||(n=!0,requestAnimationFrame(o)))},advance:function(t,r=!0,i,n){if(r&&X("before",t),i)Z(t,i,n);else for(let r of e.values())Z(t,r.store.getState());r&&X("after",t)}}}(ea),{reconciler:el,applyProps:eu}=function(e,t){function r(e,{args:t=[],attach:r,...i},n){let a,o=`${e[0].toUpperCase()}${e.slice(1)}`;if("primitive"===e){if(void 0===i.object)throw Error("R3F: Primitives without 'object' are invalid!");a=A(i.object,{type:e,root:n,attach:r,primitive:!0})}else{let i=_[o];if(!i)throw Error(`R3F: ${o} is not part of the THREE namespace! Did you forget to extend? See: https://docs.pmnd.rs/react-three-fiber/api/objects#using-3rd-party-objects-declaratively`);if(!Array.isArray(t))throw Error("R3F: The args prop must be an array!");a=A(new i(...t),{type:e,root:n,attach:r,memoizedProps:{args:t}})}return void 0===a.__r3f.attach&&(a.isBufferGeometry?a.__r3f.attach="geometry":a.isMaterial&&(a.__r3f.attach="material")),"inject"!==o&&L(a,i),a}function i(e,t){let r=!1;if(t){var i,n;null!=(i=t.__r3f)&&i.attach?I(e,t,t.__r3f.attach):t.isObject3D&&e.isObject3D&&(e.add(t),r=!0),r||null==(n=e.__r3f)||n.objects.push(t),t.__r3f||A(t,{}),t.__r3f.parent=e,H(t),N(t)}}function n(e,t,r){let i=!1;if(t){var n,a;if(null!=(n=t.__r3f)&&n.attach)I(e,t,t.__r3f.attach);else if(t.isObject3D&&e.isObject3D){t.parent=e,t.dispatchEvent({type:"added"}),e.dispatchEvent({type:"childadded",child:t});let n=e.children.filter(e=>e!==t),a=n.indexOf(r);e.children=[...n.slice(0,a),t,...n.slice(a)],i=!0}i||null==(a=e.__r3f)||a.objects.push(t),t.__r3f||A(t,{}),t.__r3f.parent=e,H(t),N(t)}}function a(e,t,r=!1){e&&[...e].forEach(e=>o(t,e,r))}function o(e,t,r){if(t){var i,n,o,s,l;t.__r3f&&(t.__r3f.parent=null),null!=(i=e.__r3f)&&i.objects&&(e.__r3f.objects=e.__r3f.objects.filter(e=>e!==t)),null!=(n=t.__r3f)&&n.attach?j(e,t,t.__r3f.attach):t.isObject3D&&e.isObject3D&&(e.remove(t),null!=(s=t.__r3f)&&s.root&&function(e,t){let{internal:r}=e.getState();r.interaction=r.interaction.filter(e=>e!==t),r.initialHits=r.initialHits.filter(e=>e!==t),r.hovered.forEach((e,i)=>{(e.eventObject===t||e.object===t)&&r.hovered.delete(i)}),r.capturedMap.forEach((e,i)=>{Y(r.capturedMap,t,e,i)})}(U(t),t));let u=null==(o=t.__r3f)?void 0:o.primitive,c=!u&&(void 0===r?null!==t.dispose:r);if(u||(a(null==(l=t.__r3f)?void 0:l.objects,t,c),a(t.children,t,c)),delete t.__r3f,c&&t.dispose&&"Scene"!==t.type){let e=()=>{try{t.dispose()}catch(e){}};"u"<typeof IS_REACT_ACT_ENVIRONMENT?(0,g.unstable_scheduleCallback)(g.unstable_IdlePriority,e):e()}N(e)}}let s=()=>{};return{reconciler:v()({createInstance:r,removeChild:o,appendChild:i,appendInitialChild:i,insertBefore:n,supportsMutation:!0,isPrimaryRenderer:!1,supportsPersistence:!1,supportsHydration:!1,noTimeout:-1,appendChildToContainer:(e,t)=>{if(!t)return;let r=e.getState().scene;r.__r3f&&(r.__r3f.root=e,i(r,t))},removeChildFromContainer:(e,t)=>{t&&o(e.getState().scene,t)},insertInContainerBefore:(e,t,r)=>{if(!t||!r)return;let i=e.getState().scene;i.__r3f&&n(i,t,r)},getRootHostContext:()=>null,getChildHostContext:e=>e,finalizeInitialChildren(e){var t;return!!(null!=(t=null==e?void 0:e.__r3f)?t:{}).handlers},prepareUpdate(e,t,r,i){var n;if((null!=(n=null==e?void 0:e.__r3f)?n:{}).primitive&&i.object&&i.object!==e)return[!0];{let{args:t=[],children:n,...a}=i,{args:o=[],children:s,...l}=r;if(!Array.isArray(t))throw Error("R3F: the args prop must be an array!");if(t.some((e,t)=>e!==o[t]))return[!0];let u=z(e,a,l,!0);return u.changes.length?[!1,u]:null}},commitUpdate(e,[t,n],a,s,l,u){t?function(e,t,n,a){var s;let l=null==(s=e.__r3f)?void 0:s.parent;if(!l)return;let u=r(t,n,e.__r3f.root);if(e.children){for(let t of e.children)t.__r3f&&i(u,t);e.children=e.children.filter(e=>!e.__r3f)}e.__r3f.objects.forEach(e=>i(u,e)),e.__r3f.objects=[],e.__r3f.autoRemovedBeforeAppend||o(l,e),u.parent&&(u.__r3f.autoRemovedBeforeAppend=!0),i(l,u),u.raycast&&u.__r3f.eventCount&&U(u).getState().internal.interaction.push(u),[a,a.alternate].forEach(e=>{null!==e&&(e.stateNode=u,e.ref&&("function"==typeof e.ref?e.ref(u):e.ref.current=u))})}(e,a,l,u):L(e,n)},commitMount(e,t,r,i){var n;let a=null!=(n=e.__r3f)?n:{};e.raycast&&a.handlers&&a.eventCount&&U(e).getState().internal.interaction.push(e)},getPublicInstance:e=>e,prepareForCommit:()=>null,preparePortalMount:e=>A(e.getState().scene),resetAfterCommit:()=>{},shouldSetTextContent:()=>!1,clearContainer:()=>!1,hideInstance(e){var t;let{attach:r,parent:i}=null!=(t=e.__r3f)?t:{};r&&i&&j(i,e,r),e.isObject3D&&(e.visible=!1),N(e)},unhideInstance(e,t){var r;let{attach:i,parent:n}=null!=(r=e.__r3f)?r:{};i&&n&&I(n,e,i),(e.isObject3D&&null==t.visible||t.visible)&&(e.visible=!0),N(e)},createTextInstance:s,hideTextInstance:s,unhideTextInstance:s,getCurrentEventPriority:()=>t?t():h.DefaultEventPriority,beforeActiveInstanceBlur:()=>{},afterActiveInstanceBlur:()=>{},detachDeletedInstance:()=>{},now:"u">typeof performance&&R.fun(performance.now)?performance.now:R.fun(Date.now)?Date.now:()=>0,scheduleTimeout:R.fun(setTimeout)?setTimeout:void 0,cancelTimeout:R.fun(clearTimeout)?clearTimeout:void 0}),applyProps:L}}(0,function(){var e;let t="u">typeof self&&self||"u">typeof window&&window;if(!t)return h.DefaultEventPriority;switch(null==(e=t.event)?void 0:e.type){case"click":case"contextmenu":case"dblclick":case"pointercancel":case"pointerdown":case"pointerup":return h.DiscreteEventPriority;case"pointermove":case"pointerout":case"pointerover":case"pointerenter":case"pointerleave":case"wheel":return h.ContinuousEventPriority;default:return h.DefaultEventPriority}}),ec={objects:"shallow",strict:!1};function eh(e){let t,r,i,n,a,o,s,d=ea.get(e),m=null==d?void 0:d.fiber,v=null==d?void 0:d.store;d&&console.warn("R3F.createRoot should only be called once!");let g="function"==typeof reportError?reportError:console.error,_=v||(a=(n=(i=(0,f.Ay)((e,t)=>{let r,i=new l.Pq0,n=new l.Pq0,a=new l.Pq0;function o(e=t().camera,r=n,s=t().size){let{width:l,height:u,top:c,left:h}=s,f=l/u;r.isVector3?a.copy(r):a.set(...r);let d=e.getWorldPosition(i).distanceTo(a);if(e&&e.isOrthographicCamera)return{width:l/e.zoom,height:u/e.zoom,top:c,left:h,factor:1,distance:d,aspect:f};{let t=2*Math.tan(e.fov*Math.PI/180/2)*d,r=l/u*t;return{width:r,height:t,top:c,left:h,factor:l/r,distance:d,aspect:f}}}let s=t=>e(e=>({performance:{...e.performance,current:t}})),u=new l.I9Y;return{set:e,get:t,gl:null,camera:null,raycaster:null,events:{priority:1,enabled:!0,connected:!1},xr:null,scene:null,invalidate:(e=1)=>eo(t(),e),advance:(e,r)=>es(e,r,t()),legacy:!1,linear:!1,flat:!1,controls:null,clock:new l.zD7,pointer:u,mouse:u,frameloop:"always",onPointerMissed:void 0,performance:{current:1,min:.5,max:1,debounce:200,regress:()=>{let e=t();r&&clearTimeout(r),e.performance.current!==e.performance.min&&s(e.performance.min),r=setTimeout(()=>s(t().performance.max),e.performance.debounce)}},size:{width:0,height:0,top:0,left:0,updateStyle:!1},viewport:{initialDpr:0,dpr:0,width:0,height:0,top:0,left:0,aspect:0,distance:0,factor:0,getCurrentViewport:o},setEvents:t=>e(e=>({...e,events:{...e.events,...t}})),setSize:(r,i,a,s,l)=>{let u=t().camera,c={width:r,height:i,top:s||0,left:l||0,updateStyle:a};e(e=>({size:c,viewport:{...e.viewport,...o(u,n,c)}}))},setDpr:t=>e(e=>{let r=E(t);return{viewport:{...e.viewport,dpr:r,initialDpr:e.viewport.initialDpr||r}}}),setFrameloop:(r="always")=>{let i=t().clock;i.stop(),i.elapsedTime=0,"never"!==r&&(i.start(),i.elapsedTime=0),e(()=>({frameloop:r}))},previousRoot:void 0,internal:{active:!1,priority:0,frames:0,lastEvent:c.createRef(),interaction:[],hovered:new Map,subscribers:[],initialClick:[0,0],initialHits:[],capturedMap:new Map,subscribe:(e,r,i)=>{let n=t().internal;return n.priority=n.priority+ +(r>0),n.subscribers.push({ref:e,priority:r,store:i}),n.subscribers=n.subscribers.sort((e,t)=>e.priority-t.priority),()=>{let i=t().internal;null!=i&&i.subscribers&&(i.priority=i.priority-(r>0),i.subscribers=i.subscribers.filter(t=>t.ref!==e))}}}}})).getState()).size,o=n.viewport.dpr,s=n.camera,i.subscribe(()=>{let{camera:e,size:t,viewport:r,gl:n,set:l}=i.getState();if(t.width!==a.width||t.height!==a.height||r.dpr!==o){var u;(a=t,o=r.dpr,!e.manual)&&(e&&e.isOrthographicCamera?(e.left=-(t.width/2),e.right=t.width/2,e.top=t.height/2,e.bottom=-(t.height/2)):e.aspect=t.width/t.height,e.updateProjectionMatrix(),e.updateMatrixWorld());n.setPixelRatio(r.dpr);let i=null!=(u=t.updateStyle)?u:"u">typeof HTMLCanvasElement&&n.domElement instanceof HTMLCanvasElement;n.setSize(t.width,t.height,i)}e!==s&&(s=e,l(t=>({viewport:{...t.viewport,...t.viewport.getCurrentViewport(e)}})))}),i.subscribe(e=>eo(e)),i),x=m||el.createContainer(_,h.ConcurrentRoot,null,!1,null,"",g,null);d||ea.set(e,{fiber:x,store:_});let b=!1;return{configure(i={}){var n,a;let o,{gl:s,size:c,scene:h,events:f,onCreated:d,shadows:p=!1,linear:m=!1,flat:v=!1,legacy:g=!1,orthographic:x=!1,frameloop:M="always",dpr:T=[1,2],performance:S,raycaster:y,camera:C,onPointerMissed:P}=i,D=_.getState(),B=D.gl;D.gl||D.set({gl:B=q(o="function"==typeof s?s(e):s)?o:new u.WebGLRenderer({powerPreference:"high-performance",canvas:e,antialias:!0,alpha:!0,...s})});let U=D.raycaster;U||D.set({raycaster:U=new l.tBo});let{params:F,...O}=y||{};if(R.equ(O,U,ec)||eu(U,{...O}),R.equ(F,U.params,ec)||eu(U,{params:{...U.params,...F}}),!D.camera||D.camera===r&&!R.equ(r,C,ec)){r=C;let e=C instanceof l.i7d,t=e?C:x?new l.qUd(0,0,0,0,.1,1e3):new l.ubm(75,0,.1,1e3);!e&&(t.position.z=5,C&&(eu(t,C),("aspect"in C||"left"in C||"right"in C||"bottom"in C||"top"in C)&&(t.manual=!0,t.updateProjectionMatrix())),D.camera||null!=C&&C.rotation||t.lookAt(0,0,0)),D.set({camera:t}),U.camera=t}if(!D.scene){let e;null!=h&&h.isScene?e=h:(e=new l.Z58,h&&eu(e,h)),D.set({scene:A(e)})}if(!D.xr){let e=(e,t)=>{let r=_.getState();"never"!==r.frameloop&&es(e,!0,r,t)},t=()=>{let t=_.getState();t.gl.xr.enabled=t.gl.xr.isPresenting,t.gl.xr.setAnimationLoop(t.gl.xr.isPresenting?e:null),t.gl.xr.isPresenting||eo(t)},r={connect(){let e=_.getState().gl;e.xr.addEventListener("sessionstart",t),e.xr.addEventListener("sessionend",t)},disconnect(){let e=_.getState().gl;e.xr.removeEventListener("sessionstart",t),e.xr.removeEventListener("sessionend",t)}};"function"==typeof(null==(n=B.xr)?void 0:n.addEventListener)&&r.connect(),D.set({xr:r})}if(B.shadowMap){let e=B.shadowMap.enabled,t=B.shadowMap.type;B.shadowMap.enabled=!!p,R.boo(p)?B.shadowMap.type=2:R.str(p)?B.shadowMap.type=null!=(a=({basic:0,percentage:1,soft:2,variance:3})[p])?a:2:R.obj(p)&&Object.assign(B.shadowMap,p),(e!==B.shadowMap.enabled||t!==B.shadowMap.type)&&(B.shadowMap.needsUpdate=!0)}let I=w();I&&("enabled"in I?I.enabled=!g:"legacyMode"in I&&(I.legacyMode=g)),b||eu(B,{outputEncoding:m?3e3:3001,toneMapping:4*!v}),D.legacy!==g&&D.set(()=>({legacy:g})),D.linear!==m&&D.set(()=>({linear:m})),D.flat!==v&&D.set(()=>({flat:v})),!s||R.fun(s)||q(s)||R.equ(s,B,ec)||eu(B,s),f&&!D.events.handlers&&D.set({events:f(_)});let j=function(e,t){let r="u">typeof HTMLCanvasElement&&e instanceof HTMLCanvasElement;if(t){let{width:e,height:i,top:n,left:a,updateStyle:o=r}=t;return{width:e,height:i,top:n,left:a,updateStyle:o}}if("u">typeof HTMLCanvasElement&&e instanceof HTMLCanvasElement&&e.parentElement){let{width:t,height:i,top:n,left:a}=e.parentElement.getBoundingClientRect();return{width:t,height:i,top:n,left:a,updateStyle:r}}return"u">typeof OffscreenCanvas&&e instanceof OffscreenCanvas?{width:e.width,height:e.height,top:0,left:0,updateStyle:r}:{width:0,height:0,top:0,left:0}}(e,c);return R.equ(j,D.size,ec)||D.setSize(j.width,j.height,j.updateStyle,j.top,j.left),T&&D.viewport.dpr!==E(T)&&D.setDpr(T),D.frameloop!==M&&D.setFrameloop(M),D.onPointerMissed||D.set({onPointerMissed:P}),S&&!R.equ(S,D.performance,ec)&&D.set(e=>({performance:{...e.performance,...S}})),t=d,b=!0,this},render(r){return b||this.configure(),el.updateContainer((0,p.Y)(ef,{store:_,children:r,onCreated:t,rootElement:e}),x,null,()=>void 0),_},unmount(){ed(e)}}}function ef({store:e,children:t,onCreated:r,rootElement:i}){return T(()=>{let t=e.getState();t.set(e=>({internal:{...e.internal,active:!0}})),r&&r(t),e.getState().events.connected||null==t.events.connect||t.events.connect(i)},[]),(0,p.Y)(V.Provider,{value:e,children:t})}function ed(e,t){let r=ea.get(e),i=null==r?void 0:r.fiber;if(i){let n=null==r?void 0:r.store.getState();n&&(n.internal.active=!1),el.updateContainer(null,i,null,()=>{n&&setTimeout(()=>{try{var r,i,a,o;for(let e in null==n.events.disconnect||n.events.disconnect(),null==(r=n.gl)||null==(i=r.renderLists)||null==i.dispose||i.dispose(),null==(a=n.gl)||null==a.forceContextLoss||a.forceContextLoss(),null!=(o=n.gl)&&o.xr&&n.xr.disconnect(),n.dispose&&"Scene"!==n.type&&n.dispose(),n)null==e.dispose||e.dispose(),delete n[e];ea.delete(e),t&&t(e)}catch(e){}},500)})}}el.injectIntoDevTools({bundleType:0,rendererPackageName:"@react-three/fiber",version:c.version}),c.unstable_act;let ep={onClick:["click",!1],onContextMenu:["contextmenu",!1],onDoubleClick:["dblclick",!1],onWheel:["wheel",!0],onPointerDown:["pointerdown",!0],onPointerUp:["pointerup",!0],onPointerLeave:["pointerleave",!0],onPointerMove:["pointermove",!0],onPointerCancel:["pointercancel",!0],onLostPointerCapture:["lostpointercapture",!0]};function em(e){let{handlePointer:t}=function(e){function t(e){return e.filter(e=>["Move","Over","Enter","Out","Leave"].some(t=>{var r;return null==(r=e.__r3f)?void 0:r.handlers["onPointer"+t]}))}function r(t){let{internal:r}=e.getState();for(let e of r.hovered.values())if(!t.length||!t.find(t=>t.object===e.object&&t.index===e.index&&t.instanceId===e.instanceId)){let i=e.eventObject.__r3f,n=null==i?void 0:i.handlers;if(r.hovered.delete(W(e)),null!=i&&i.eventCount){let r={...e,intersections:t};null==n.onPointerOut||n.onPointerOut(r),null==n.onPointerLeave||n.onPointerLeave(r)}}}function i(e,t){for(let r=0;r<t.length;r++){let i=t[r].__r3f;null==i||null==i.handlers.onPointerMissed||i.handlers.onPointerMissed(e)}}return{handlePointer:function(n){switch(n){case"onPointerLeave":case"onPointerCancel":return()=>r([]);case"onLostPointerCapture":return t=>{let{internal:i}=e.getState();"pointerId"in t&&i.capturedMap.has(t.pointerId)&&requestAnimationFrame(()=>{i.capturedMap.has(t.pointerId)&&(i.capturedMap.delete(t.pointerId),r([]))})}}return function(a){let{onPointerMissed:o,internal:s}=e.getState();s.lastEvent.current=a;let u="onPointerMove"===n,c="onClick"===n||"onContextMenu"===n||"onDoubleClick"===n,h=function(t,r){let i=e.getState(),n=new Set,a=[],o=r?r(i.internal.interaction):i.internal.interaction;for(let e=0;e<o.length;e++){let t=B(o[e]);t&&(t.raycaster.camera=void 0)}i.previousRoot||null==i.events.compute||i.events.compute(t,i);let s=o.flatMap(function(e){let r=B(e);if(!r||!r.events.enabled||null===r.raycaster.camera)return[];if(void 0===r.raycaster.camera){var i;null==r.events.compute||r.events.compute(t,r,null==(i=r.previousRoot)?void 0:i.getState()),void 0===r.raycaster.camera&&(r.raycaster.camera=null)}return r.raycaster.camera?r.raycaster.intersectObject(e,!0):[]}).sort((e,t)=>{let r=B(e.object),i=B(t.object);return r&&i&&i.events.priority-r.events.priority||e.distance-t.distance}).filter(e=>{let t=W(e);return!n.has(t)&&(n.add(t),!0)});for(let e of(i.events.filter&&(s=i.events.filter(s,i)),s)){let t=e.object;for(;t;){var l;null!=(l=t.__r3f)&&l.eventCount&&a.push({...e,eventObject:t}),t=t.parent}}if("pointerId"in t&&i.internal.capturedMap.has(t.pointerId))for(let e of i.internal.capturedMap.get(t.pointerId).values())n.has(W(e.intersection))||a.push(e.intersection);return a}(a,u?t:void 0),f=c?function(t){let{internal:r}=e.getState(),i=t.offsetX-r.initialClick[0],n=t.offsetY-r.initialClick[1];return Math.round(Math.sqrt(i*i+n*n))}(a):0;"onPointerDown"===n&&(s.initialClick=[a.offsetX,a.offsetY],s.initialHits=h.map(e=>e.eventObject)),c&&!h.length&&f<=2&&(i(a,s.interaction),o&&o(a)),u&&r(h),!function(t,i,n,a){let o=e.getState();if(t.length){let e={stopped:!1};for(let s of t){let{raycaster:u,pointer:c,camera:h,internal:f}=B(s.object)||o,d=new l.Pq0(c.x,c.y,0).unproject(h),p=e=>{var t,r;return null!=(t=null==(r=f.capturedMap.get(e))?void 0:r.has(s.eventObject))&&t},m=e=>{let t={intersection:s,target:i.target};f.capturedMap.has(e)?f.capturedMap.get(e).set(s.eventObject,t):f.capturedMap.set(e,new Map([[s.eventObject,t]])),i.target.setPointerCapture(e)},v=e=>{let t=f.capturedMap.get(e);t&&Y(f.capturedMap,s.eventObject,t,e)},g={};for(let e in i){let t=i[e];"function"!=typeof t&&(g[e]=t)}let _={...s,...g,pointer:c,intersections:t,stopped:e.stopped,delta:n,unprojectedPoint:d,ray:u.ray,camera:h,stopPropagation(){let n="pointerId"in i&&f.capturedMap.get(i.pointerId);(!n||n.has(s.eventObject))&&(_.stopped=e.stopped=!0,f.hovered.size&&Array.from(f.hovered.values()).find(e=>e.eventObject===s.eventObject)&&r([...t.slice(0,t.indexOf(s)),s]))},target:{hasPointerCapture:p,setPointerCapture:m,releasePointerCapture:v},currentTarget:{hasPointerCapture:p,setPointerCapture:m,releasePointerCapture:v},nativeEvent:i};if(a(_),!0===e.stopped)break}}}(h,a,f,function(e){let t=e.eventObject,r=t.__r3f,o=null==r?void 0:r.handlers;if(null!=r&&r.eventCount)if(u){if(o.onPointerOver||o.onPointerEnter||o.onPointerOut||o.onPointerLeave){let t=W(e),r=s.hovered.get(t);r?r.stopped&&e.stopPropagation():(s.hovered.set(t,e),null==o.onPointerOver||o.onPointerOver(e),null==o.onPointerEnter||o.onPointerEnter(e))}null==o.onPointerMove||o.onPointerMove(e)}else{let r=o[n];r?(!c||s.initialHits.includes(t))&&(i(a,s.interaction.filter(e=>!s.initialHits.includes(e))),r(e)):c&&s.initialHits.includes(t)&&i(a,s.interaction.filter(e=>!s.initialHits.includes(e)))}})}}}}(e);return{priority:1,enabled:!0,compute(e,t,r){t.pointer.set(e.offsetX/t.size.width*2-1,-(2*(e.offsetY/t.size.height))+1),t.raycaster.setFromCamera(t.pointer,t.camera)},connected:void 0,handlers:Object.keys(ep).reduce((e,r)=>({...e,[r]:t(r)}),{}),update:()=>{var t;let{events:r,internal:i}=e.getState();null!=(t=i.lastEvent)&&t.current&&r.handlers&&r.handlers.onPointerMove(i.lastEvent.current)},connect:t=>{var r;let{set:i,events:n}=e.getState();null==n.disconnect||n.disconnect(),i(e=>({events:{...e.events,connected:t}})),Object.entries(null!=(r=n.handlers)?r:[]).forEach(([e,r])=>{let[i,n]=ep[e];t.addEventListener(i,r,{passive:n})})},disconnect:()=>{let{set:t,events:r}=e.getState();if(r.connected){var i;Object.entries(null!=(i=r.handlers)?i:[]).forEach(([e,t])=>{if(r&&r.connected instanceof HTMLElement){let[i]=ep[e];r.connected.removeEventListener(i,t)}}),t(e=>({events:{...e.events,connected:void 0}}))}}}}},9743(e,t,r){r.d(t,{Hl:()=>c});var i=r(1794),n=r(7378),a=r(9451),o=r(9011),s=r(8024),l=r(8284);r(3344),r(7369),r(1434);let u=n.forwardRef(function({children:e,fallback:t,resize:r,style:u,gl:c,events:h=i.c,eventSource:f,eventPrefix:d,shadows:p,linear:m,flat:v,legacy:g,orthographic:_,frameloop:x,dpr:b,performance:w,raycaster:M,camera:T,scene:S,onPointerMissed:y,onCreated:C,...P},D){n.useMemo(()=>(0,i.e)(a),[]);let E=(0,s.y3)(),[B,U]=(0,o.A)({scroll:!0,debounce:{scroll:50,resize:0},...r}),R=n.useRef(null),A=n.useRef(null);n.useImperativeHandle(D,()=>R.current);let F=(0,i.u)(y),[O,I]=n.useState(!1),[j,z]=n.useState(!1);if(O)throw O;if(j)throw j;let k=n.useRef(null);(0,i.a)(()=>{let t=R.current;U.width>0&&U.height>0&&t&&(k.current||(k.current=(0,i.b)(t)),k.current.configure({gl:c,events:h,shadows:p,linear:m,flat:v,legacy:g,orthographic:_,frameloop:x,dpr:b,performance:w,raycaster:M,camera:T,scene:S,size:U,onPointerMissed:(...e)=>null==F.current?void 0:F.current(...e),onCreated:e=>{null==e.events.connect||e.events.connect(f?(0,i.i)(f)?f.current:f:A.current),d&&e.setEvents({compute:(e,t)=>{let r=e[d+"X"],i=e[d+"Y"];t.pointer.set(r/t.size.width*2-1,-(2*(i/t.size.height))+1),t.raycaster.setFromCamera(t.pointer,t.camera)}}),null==C||C(e)}}),k.current.render((0,l.Y)(E,{children:(0,l.Y)(i.E,{set:z,children:(0,l.Y)(n.Suspense,{fallback:(0,l.Y)(i.B,{set:I}),children:null!=e?e:null})})})))}),n.useEffect(()=>{let e=R.current;if(e)return()=>(0,i.d)(e)},[]);let L=f?"none":"auto";return(0,l.Y)("div",{ref:A,style:{position:"relative",width:"100%",height:"100%",overflow:"hidden",pointerEvents:L,...u},...P,children:(0,l.Y)("div",{ref:B,style:{width:"100%",height:"100%"},children:(0,l.Y)("canvas",{ref:R,style:{display:"block"},children:t})})})}),c=n.forwardRef(function(e,t){return(0,l.Y)(s.Af,{children:(0,l.Y)(u,{...e,ref:t})})})},9914(e,t,r){r.d(t,{l:()=>n});var i=r(2150);class n extends i.Z58{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const e=new i.iNn;e.deleteAttribute("uv");const t=new i._4j({side:1}),r=new i._4j,n=new i.HiM(0xffffff,900,28,2);n.position.set(.418,16.199,.3),this.add(n);const o=new i.eaF(e,t);o.position.set(-.757,13.219,.717),o.scale.set(31.713,28.305,28.591),this.add(o);const s=new i.ZLX(e,r,6),l=new i.B69;l.position.set(-10.906,2.009,1.846),l.rotation.set(0,-.195,0),l.scale.set(2.328,7.905,4.651),l.updateMatrix(),s.setMatrixAt(0,l.matrix),l.position.set(-5.607,-.754,-.758),l.rotation.set(0,.994,0),l.scale.set(1.97,1.534,3.955),l.updateMatrix(),s.setMatrixAt(1,l.matrix),l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),l.updateMatrix(),s.setMatrixAt(2,l.matrix),l.position.set(-2.017,.018,6.124),l.rotation.set(0,.333,0),l.scale.set(2.002,4.566,2.064),l.updateMatrix(),s.setMatrixAt(3,l.matrix),l.position.set(2.291,-.756,-2.621),l.rotation.set(0,-.286,0),l.scale.set(1.546,1.552,1.496),l.updateMatrix(),s.setMatrixAt(4,l.matrix),l.position.set(-2.193,-.369,-5.547),l.rotation.set(0,.516,0),l.scale.set(3.875,3.487,2.986),l.updateMatrix(),s.setMatrixAt(5,l.matrix),this.add(s);const u=new i.eaF(e,a(50));u.position.set(-16.116,14.37,8.208),u.scale.set(.1,2.428,2.739),this.add(u);const c=new i.eaF(e,a(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const h=new i.eaF(e,a(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const f=new i.eaF(e,a(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);const d=new i.eaF(e,a(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);const p=new i.eaF(e,a(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){let e=new Set;for(let t of(this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))}),e))t.dispose()}}function a(e){return new i.G_z({color:0,emissive:0xffffff,emissiveIntensity:e})}},6984(e,t,r){r.d(t,{s:()=>u});var i=r(2150),n=r(7564),a=r(621),o=r(6828);class s extends o.o{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,r){let i,n,a=e.getContext(),o=e.state;o.buffers.color.setMask(!1),o.buffers.depth.setMask(!1),o.buffers.color.setLocked(!0),o.buffers.depth.setLocked(!0),this.inverse?(i=0,n=1):(i=1,n=0),o.buffers.stencil.setTest(!0),o.buffers.stencil.setOp(a.REPLACE,a.REPLACE,a.REPLACE),o.buffers.stencil.setFunc(a.ALWAYS,i,0xffffffff),o.buffers.stencil.setClear(n),o.buffers.stencil.setLocked(!0),e.setRenderTarget(r),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),o.buffers.color.setLocked(!1),o.buffers.depth.setLocked(!1),o.buffers.color.setMask(!0),o.buffers.depth.setMask(!0),o.buffers.stencil.setLocked(!1),o.buffers.stencil.setFunc(a.EQUAL,1,0xffffffff),o.buffers.stencil.setOp(a.KEEP,a.KEEP,a.KEEP),o.buffers.stencil.setLocked(!0)}}class l extends o.o{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class u{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),void 0===t){const r=e.getSize(new i.I9Y);this._width=r.width,this._height=r.height,(t=new i.nWS(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:1016})).texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new a.p(n.Z),this.copyPass.material.blending=0,this.timer=new i.M4G}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);-1!==t&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),void 0===e&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),r=!1;for(let t=0,i=this.passes.length;t<i;t++){let i=this.passes[t];if(!1!==i.enabled){if(i.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),i.render(this.renderer,this.writeBuffer,this.readBuffer,e,r),i.needsSwap){if(r){let t=this.renderer.getContext(),r=this.renderer.state.buffers.stencil;r.setFunc(t.NOTEQUAL,1,0xffffffff),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),r.setFunc(t.EQUAL,1,0xffffffff)}this.swapBuffers()}void 0!==s&&(i instanceof s?r=!0:i instanceof l&&(r=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(void 0===e){let t=this.renderer.getSize(new i.I9Y);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,(e=this.renderTarget1.clone()).setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let r=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(r,i),this.renderTarget2.setSize(r,i);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(r,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}},8309(e,t,r){r.d(t,{X:()=>o});var i=r(2150),n=r(6828);let a={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class o extends n.o{constructor(){super(),this.isOutputPass=!0,this.uniforms=i.LlO.clone(a.uniforms),this.material=new i.D$Q({name:a.name,uniforms:this.uniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this._fsQuad=new n.F(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,r){this.uniforms.tDiffuse.value=r.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},"srgb"===i.ppV.getTransfer(this._outputColorSpace)&&(this.material.defines.SRGB_TRANSFER=""),1===this._toneMapping?this.material.defines.LINEAR_TONE_MAPPING="":2===this._toneMapping?this.material.defines.REINHARD_TONE_MAPPING="":3===this._toneMapping?this.material.defines.CINEON_TONE_MAPPING="":4===this._toneMapping?this.material.defines.ACES_FILMIC_TONE_MAPPING="":6===this._toneMapping?this.material.defines.AGX_TONE_MAPPING="":7===this._toneMapping?this.material.defines.NEUTRAL_TONE_MAPPING="":5===this._toneMapping&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),!0===this.renderToScreen?e.setRenderTarget(null):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil)),this._fsQuad.render(e)}dispose(){this.material.dispose(),this._fsQuad.dispose()}}},6828(e,t,r){r.d(t,{F:()=>l,o:()=>n});var i=r(2150);class n{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}let a=new i.qUd(-1,1,1,-1,0,1);class o extends i.LoY{constructor(){super(),this.setAttribute("position",new i.qtW([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new i.qtW([0,2,0,0,2,0],2))}}let s=new o;class l{constructor(e){this._mesh=new i.eaF(s,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,a)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}},7816(e,t,r){r.d(t,{A:()=>a});var i=r(2150),n=r(6828);class a extends n.o{constructor(e,t,r=null,n=null,a=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=r,this.clearColor=n,this.clearAlpha=a,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new i.Q1f}render(e,t,r){let i,n,a=e.autoClear;e.autoClear=!1,null!==this.overrideMaterial&&(n=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),null!==this.clearColor&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),null!==this.clearAlpha&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),!0==this.clearDepth&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:r),!0===this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),null!==this.clearColor&&e.setClearColor(this._oldClearColor),null!==this.clearAlpha&&e.setClearAlpha(i),null!==this.overrideMaterial&&(this.scene.overrideMaterial=n),e.autoClear=a}}},621(e,t,r){r.d(t,{p:()=>a});var i=r(2150),n=r(6828);class a extends n.o{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof i.BKk?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=i.LlO.clone(e.uniforms),this.material=new i.BKk({name:void 0!==e.name?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new n.F(this.material)}render(e,t,r){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=r.texture),this._fsQuad.material=this.material,this.renderToScreen?e.setRenderTarget(null):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil)),this._fsQuad.render(e)}dispose(){this.material.dispose(),this._fsQuad.dispose()}}},3107(e,t,r){r.d(t,{C:()=>s});var i=r(2150),n=r(6828),a=r(7564);let o={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new i.Q1f(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class s extends n.o{constructor(e,t=1,r,s){super(),this.strength=t,this.radius=r,this.threshold=s,this.resolution=void 0!==e?new i.I9Y(e.x,e.y):new i.I9Y(256,256),this.clearColor=new i.Q1f(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let l=Math.round(this.resolution.x/2),u=Math.round(this.resolution.y/2);this.renderTargetBright=new i.nWS(l,u,{type:1016,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){const t=new i.nWS(l,u,{type:1016,depthBuffer:!1});t.texture.name="UnrealBloomPass.h"+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);const r=new i.nWS(l,u,{type:1016,depthBuffer:!1});r.texture.name="UnrealBloomPass.v"+e,r.texture.generateMipmaps=!1,this.renderTargetsVertical.push(r),l=Math.round(l/2),u=Math.round(u/2)}this.highPassUniforms=i.LlO.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new i.BKk({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const c=[6,10,14,18,22];l=Math.round(this.resolution.x/2),u=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new i.I9Y(1/l,1/u),l=Math.round(l/2),u=Math.round(u/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1,this.compositeMaterial.uniforms.bloomFactors.value=[1,.8,.6,.4,.2],this.bloomTintColors=[new i.Pq0(1,1,1),new i.Pq0(1,1,1),new i.Pq0(1,1,1),new i.Pq0(1,1,1),new i.Pq0(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=i.LlO.clone(a.Z.uniforms),this.blendMaterial=new i.BKk({uniforms:this.copyUniforms,vertexShader:a.Z.vertexShader,fragmentShader:a.Z.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new i.Q1f,this._oldClearAlpha=1,this._basic=new i.V9B,this._fsQuad=new n.F(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let r=Math.round(e/2),n=Math.round(t/2);this.renderTargetBright.setSize(r,n);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(r,n),this.renderTargetsVertical[e].setSize(r,n),this.separableBlurMaterials[e].uniforms.invSize.value=new i.I9Y(1/r,1/n),r=Math.round(r/2),n=Math.round(n/2)}render(e,t,r,i,n){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),n&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let t=0;t<this.nMips;t++)this._fsQuad.material=this.separableBlurMaterials[t],this.separableBlurMaterials[t].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[t].uniforms.direction.value=s.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[t]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[t].uniforms.colorTexture.value=this.renderTargetsHorizontal[t].texture,this.separableBlurMaterials[t].uniforms.direction.value=s.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[t]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[t];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,n&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?e.setRenderTarget(null):e.setRenderTarget(r),this._fsQuad.render(e),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){let t=[],r=e/3;for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(r*r))/r);let n=[],a=[];for(let r=1;r<e;r+=2){let i=t[r],o=r+1<e?t[r+1]:0,s=i+o;n.push((r*i+(r+1)*o)/s),a.push(s)}return new i.BKk({defines:{KERNEL_PAIRS:n.length},uniforms:{colorTexture:{value:null},invSize:{value:new i.I9Y(.5,.5)},direction:{value:new i.I9Y(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:n},gaussianWeights:{value:a}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new i.BKk({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}s.BlurDirectionX=new i.I9Y(1,0),s.BlurDirectionY=new i.I9Y(0,1)},7564(e,t,r){r.d(t,{Z:()=>i});let i={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`}},8868(e,t,r){r.d(t,{H:()=>i});let i={name:"RGBShiftShader",uniforms:{tDiffuse:{value:null},amount:{value:.005},angle:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform float amount;
		uniform float angle;

		varying vec2 vUv;

		void main() {

			vec2 offset = amount * vec2( cos(angle), sin(angle));
			vec4 cr = texture2D(tDiffuse, vUv + offset);
			vec4 cga = texture2D(tDiffuse, vUv);
			vec4 cb = texture2D(tDiffuse, vUv - offset);
			gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);

		}`}}}]);
//# sourceMappingURL=three~f690bd46.8f5e7fa3edeb63dc.js.map