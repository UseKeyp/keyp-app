export default function WalletInitializationSpinner() {
  return (
    <svg
      id="image-mark-stroke"
      height="112"
      width="112"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17.94 17.94"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
    >
      <style>
        {`@keyframes #image-mark-stroke-u-line_tr__tr{0%{transform:translate(8.959798px,8.979207px) rotate(0deg)}40%{transform:translate(8.959798px,8.979207px) rotate(0deg);animation-timing-function:cubic-bezier(.77,0,.175,1)}to{transform:translate(8.959798px,8.979207px) rotate(360deg)}}@keyframes image-mark-stroke-u-line_c_o{0%{opacity:1}60%{opacity:1;animation-timing-function:cubic-bezier(.645,.045,.355,1)}to{opacity:0}}@keyframes image-mark-stroke-u-05_s_do{0%{stroke-dashoffset:16.966138}26.666667%{stroke-dashoffset:16.966138;animation-timing-function:cubic-bezier(.645,.045,.355,1)}73.333333%,to{stroke-dashoffset:0}}@keyframes image-mark-stroke-u-04_s_do{0%{stroke-dashoffset:7.689743}20%{stroke-dashoffset:7.689743;animation-timing-function:cubic-bezier(.645,.045,.355,1)}40%,to{stroke-dashoffset:0}}@keyframes image-mark-stroke-u-03_s_do{0%{stroke-dashoffset:3.839496}13.333333%{stroke-dashoffset:3.839496;animation-timing-function:cubic-bezier(.645,.045,.355,1)}26.666667%,to{stroke-dashoffset:0}}@keyframes image-mark-stroke-u-02_s_do{0%{stroke-dashoffset:.649135}6.666667%{stroke-dashoffset:.649135;animation-timing-function:cubic-bezier(.645,.045,.355,1)}20%,to{stroke-dashoffset:0}}@keyframes image-mark-stroke-u-01_c_o{0%{opacity:0;animation-timing-function:cubic-bezier(.645,.045,.355,1)}13.333333%,to{opacity:1}}@keyframes image-mark-stroke-u-01_s_do{0%{stroke-dashoffset:.054686}13.333333%,to{stroke-dashoffset:0}}`}
      </style>
      <circle
        id="image-mark-stroke-u-donut"
        r={6.36}
        transform="translate(8.97 8.97)"
        fill="none"
        stroke="#005285"
        strokeWidth={5.21}
        strokeMiterlimit={10}
      />
      <g
        style={{
          animation:
            'image-mark-stroke-u-line_tr__tr 1500ms linear infinite normal forwards',
        }}
      >
        <g
          style={{
            animation:
              'image-mark-stroke-u-line_c_o 1500ms linear infinite normal forwards',
          }}
          fill="none"
          strokeWidth={1.25}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M3.94 13.05a6.482 6.482 0 01.93-9.13 6.492 6.492 0 016.38-1.05"
            stroke="#30b0ff"
            strokeDashoffset={16.966138}
            strokeDasharray={16.966138}
            style={{
              animation:
                'image-mark-stroke-u-05_s_do 1500ms linear infinite normal forwards',
            }}
            transform="translate(8.96 8.98) translate(-8.96 -8.98)"
          />
          <path
            d="M13.05 14a6.452 6.452 0 01-4.74 1.47c-.89-.08-1.72-.34-2.47-.74"
            opacity={0.8}
            stroke="#27a4f2"
            strokeDashoffset={7.689743}
            strokeDasharray={7.689743}
            style={{
              animation:
                'image-mark-stroke-u-04_s_do 1500ms linear infinite normal forwards',
            }}
            transform="translate(8.96 8.98) translate(-8.96 -8.98)"
          />
          <path
            d="M15.43 8.5c.08 1.31-.24 2.59-.88 3.68"
            opacity={0.7}
            stroke="#1696e6"
            strokeDashoffset={3.839496}
            strokeDasharray={3.839496}
            style={{
              animation:
                'image-mark-stroke-u-03_s_do 1500ms linear infinite normal forwards',
            }}
            transform="translate(8.96 8.98) translate(-8.96 -8.98)"
          />
          <path
            d="M14.63 5.93c.1.19.19.39.27.59"
            opacity={0.6}
            stroke="#008ce3"
            strokeDashoffset={0.649135}
            strokeDasharray={0.649135}
            style={{
              animation:
                'image-mark-stroke-u-02_s_do 1500ms linear infinite normal forwards',
            }}
            transform="translate(8.96 8.98) translate(-8.96 -8.98)"
          />
        </g>
      </g>
    </svg>
  )
}
