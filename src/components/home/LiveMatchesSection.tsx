import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Animated, Easing } from "react-native";
import { SvgXml } from "react-native-svg";

const STAR_SVG = `<svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.06266 1.61107C6.69255 -0.536992 9.92224 -0.536992 11.5521 1.61107L11.6247 1.70672C12.1255 2.36677 12.8322 2.84092 13.6329 3.05409L14.0488 3.16484C16.5019 3.81798 17.4345 6.80648 15.7884 8.73892C15.2329 9.39097 14.9397 10.2262 14.9658 11.0824L14.9679 11.1499C15.0441 13.6542 12.6188 15.4797 10.2334 14.7136L9.56754 14.4997C8.74806 14.2365 7.86673 14.2365 7.04725 14.4997L6.38142 14.7136C3.99601 15.4797 1.57068 13.6542 1.64694 11.1499L1.64899 11.0824C1.67506 10.2262 1.38188 9.39097 0.826426 8.73892C-0.819735 6.80648 0.112919 3.81798 2.56599 3.16484L2.98192 3.05409C3.78257 2.84092 4.48925 2.36677 4.99008 1.70672L5.06266 1.61107Z" fill="#159A42"/>
</svg>`;

const FOOTBALL_SVG = `<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.55921 11.6249H10.4632C10.54 11.6249 10.5573 11.5691 10.5874 11.5116L11.0687 10.6731C11.1354 10.5574 11.1969 10.4585 11.2628 10.3396C11.3532 10.1773 12.0089 9.06193 12.0089 9.0113C12.0089 8.91206 10.8108 6.94735 10.5954 6.52869C10.5661 6.47123 10.5456 6.39771 10.4628 6.39771H7.55881C7.46721 6.39771 7.41337 6.54757 7.33944 6.67976L6.7621 7.68662C6.67411 7.83207 6.01278 8.96028 6.01278 9.0113C6.01278 9.11014 7.1948 11.0435 7.42582 11.4939C7.45555 11.5514 7.47564 11.6249 7.55881 11.6249H7.55921Z" fill="#159A42"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.97505 15.0573C6.63195 15.4049 7.77178 15.7701 8.77341 15.7701H9.24871C10.2532 15.7701 11.3886 15.4061 12.0471 15.0573C11.7152 14.4297 11.0852 13.3795 10.6991 12.7089C10.6364 12.6004 10.5472 12.3907 10.4629 12.3907H7.55884C7.46121 12.3907 7.18841 12.9516 7.1414 13.0291C7.0044 13.2573 6.8927 13.4663 6.7557 13.6997L5.97465 15.0573H5.97505Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.97501 2.96563C6.09715 3.19706 6.22452 3.4064 6.35992 3.63662C6.49692 3.87006 6.60901 4.07858 6.74602 4.30679C6.88222 4.5338 6.99512 4.75116 7.13213 4.97697L7.42221 5.4792C7.46078 5.54629 7.48207 5.63228 7.55921 5.63228H10.4632C10.5593 5.63228 10.7963 5.13366 10.8803 4.99344L12.047 2.96563C11.3725 2.60885 10.2519 2.25287 9.22216 2.25287H8.7999C7.77336 2.25287 6.64718 2.61005 5.97501 2.96563Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.25287 8.61518H5.34172C5.36302 8.52357 5.64546 8.06554 5.71015 7.95384L6.74311 6.16148C6.77887 6.10202 6.82588 6.07189 6.81021 5.98631C6.79495 5.90434 5.34896 3.50328 5.31601 3.36145C5.11071 3.41609 4.24367 4.17507 4.05644 4.39886L3.81457 4.68533C3.01223 5.67934 2.45295 6.83125 2.30389 8.13785C2.28943 8.26482 2.25327 8.4854 2.25327 8.61518H2.25287Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.7071 14.6611C12.9196 14.6044 13.407 14.1319 13.5785 14.0009C13.7529 13.868 14.0587 13.5228 14.2085 13.3372C14.2568 13.2777 14.2773 13.2637 14.3295 13.1942C14.9992 12.3006 15.4167 11.4725 15.6445 10.3379C15.673 10.1964 15.6999 10.055 15.7196 9.88466C15.7341 9.7577 15.7702 9.53712 15.7702 9.40735H12.6814C12.6601 9.49896 12.3777 9.95699 12.3134 10.0687L11.5612 11.3761C11.4929 11.4918 11.4459 11.5778 11.376 11.6927C11.1354 12.0901 11.1321 11.9225 11.5878 12.6923C11.6806 12.8494 12.6854 14.5651 12.7075 14.6611H12.7071Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.31561 14.6611C5.33731 14.5683 5.99902 13.4469 6.05969 13.346L6.80981 12.0362C6.82789 11.9382 6.5145 11.4653 6.46187 11.3761L5.71015 10.0687C5.64385 9.95337 5.36302 9.49815 5.34172 9.40735H2.25287C2.25287 9.83686 2.45617 10.7461 2.58594 11.1334C2.76795 11.6766 2.97767 12.1045 3.24726 12.5573C3.62332 13.1889 4.14001 13.7498 4.69969 14.2203C4.81419 14.3163 5.18945 14.6273 5.31521 14.6611H5.31561Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.6807 8.61508H15.7696C15.7696 8.49696 15.7354 8.27115 15.7218 8.16147C15.5627 6.88178 15.1018 5.86889 14.3517 4.8588C14.3007 4.7901 14.2858 4.77483 14.2328 4.71375C14.1797 4.65309 14.1725 4.62979 14.1134 4.56912C13.7635 4.20952 13.7856 4.19144 13.3228 3.80211C13.2083 3.70608 12.833 3.3951 12.7072 3.36176C12.6747 3.50117 11.2279 5.90626 11.213 5.98661C11.1949 6.08465 11.5079 6.55714 11.561 6.64674L12.3131 7.95415C12.3794 8.06946 12.6598 8.52468 12.6811 8.61548L12.6807 8.61508Z" fill="white"/>
</svg>`;

const TENNIS_SVG = `<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.25323 8.53522C2.54383 8.53522 2.92836 8.48826 3.10136 8.51234C3.35703 8.54766 3.68495 8.55088 3.93982 8.59423C6.97545 9.10762 9.08108 11.3771 9.47885 14.4459C9.54187 14.932 9.48728 15.355 9.48728 15.7701C10.2254 15.7536 11.3216 15.4249 11.9622 15.1037C13.3766 14.3945 14.3937 13.3769 15.1034 11.9628C15.4104 11.351 15.7536 10.2002 15.7697 9.48775C15.158 9.48775 15.1154 9.56963 14.364 9.46567C13.2763 9.31555 12.2576 8.98198 11.3597 8.34536C9.62978 7.11908 8.5039 5.11127 8.5039 2.95133C8.5039 2.69323 8.53561 2.53388 8.53561 2.2533C7.6301 2.27337 6.32602 2.72895 5.563 3.18334C4.92761 3.56186 4.3388 4.05559 3.86156 4.62317C3.73312 4.7761 3.62555 4.89612 3.50955 5.06431C3.39677 5.22768 3.29601 5.37339 3.19486 5.54318C3.08729 5.72381 3.01184 5.87754 2.91952 6.06098C2.75495 6.38933 2.60003 6.79153 2.48845 7.1845C2.39613 7.50884 2.26085 8.19604 2.25323 8.53603V8.53522Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.25325 9.55073C2.5286 12.8615 5.16165 15.4943 8.47182 15.7696C8.47182 15.6087 8.50353 15.5966 8.50353 15.4204C8.50353 14.3888 8.43008 13.6149 7.97492 12.7126C7.89264 12.5492 7.82921 12.4195 7.74372 12.277C7.44549 11.7793 7.3877 11.7323 7.03609 11.3346C6.1069 10.2829 4.60695 9.51862 3.17282 9.51862H2.60166C2.42545 9.51862 2.41341 9.55033 2.25286 9.55033L2.25325 9.55073Z" fill="#159A42"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.51894 2.60168C9.51894 3.6377 9.59039 4.40317 10.0476 5.30954C10.1298 5.47291 10.1933 5.60256 10.2788 5.74506C10.3647 5.88836 10.4453 6.00959 10.5405 6.14967C10.6284 6.27973 10.7271 6.40577 10.8294 6.52699C11.3496 7.14234 11.9926 7.61198 12.7131 7.97484C13.6154 8.42963 14.3893 8.50349 15.4208 8.50349C15.597 8.50349 15.6091 8.47178 15.77 8.47178C15.4947 5.16543 12.858 2.52783 9.55146 2.25287C9.55146 2.41383 9.51975 2.42587 9.51975 2.60168H9.51894Z" fill="#159A42"/>
</svg>`;

const BASKETBALL_SVG = `<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.40785 11.7834C9.84131 11.7834 10.426 11.7042 10.6752 11.7042C10.6752 11.5279 10.7755 11.145 10.8241 10.9818C10.9276 10.6324 11.1919 10.0656 11.4104 9.77304C11.6018 9.51712 11.7941 9.24527 11.943 8.9591C12.3167 8.24107 12.5762 7.29259 12.5762 6.45078C12.5762 5.65633 12.5635 5.27622 12.3354 4.50008C12.1483 3.86246 11.8725 3.30245 11.4832 2.79139C11.3949 2.67557 11.365 2.67 11.2269 2.62542C10.6672 2.44432 10.0746 2.25287 9.40826 2.25287L9.40785 11.7834Z" fill="#159A42"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.44736 5.97515C5.44736 7.07686 5.51662 7.65638 5.93377 8.657C6.17338 9.23254 6.48226 9.5414 6.77602 10.0326C7.02359 10.4461 7.34877 11.2433 7.34877 11.7042C7.61944 11.7042 8.14367 11.7834 8.61613 11.7834V2.25287C8.12814 2.25287 7.54899 2.39059 7.15454 2.50721C7.03632 2.54223 6.95513 2.57367 6.83731 2.61228C6.51809 2.71656 6.45798 2.871 6.21239 3.28096C5.78729 3.99062 5.44815 5.08836 5.44815 5.97554L5.44736 5.97515Z" fill="#159A42"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.3674 6.23911C13.3674 6.50897 13.3379 6.81862 13.3101 7.07932C13.207 8.03974 12.8822 8.95638 12.3695 9.7556C12.1243 10.1377 11.8735 10.4279 11.6889 10.8701C11.5945 11.0957 11.4727 11.559 11.4668 11.5718C12.0451 11.5718 13.5831 11.0675 14.0894 10.8414C14.7494 10.5473 15.106 10.3494 15.6505 9.89451C15.7707 9.79421 15.7321 9.75163 15.7456 9.56734C15.7588 9.38704 15.7671 9.21151 15.7699 9.03917V8.8115C15.7604 8.19457 15.67 7.61188 15.463 6.99455C15.3715 6.72151 15.2935 6.47194 15.1717 6.22995C14.6479 5.19072 14.3402 4.76364 13.5067 3.96124L12.7604 3.3877L12.9881 4.00463C13.2233 4.71589 13.3678 5.4769 13.3678 6.23871L13.3674 6.23911Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.25287 8.77366L2.27516 9.54343C2.3074 9.85468 2.20033 9.82284 2.83917 10.2467C3.5433 10.714 4.34455 11.0344 5.1665 11.2724C5.44871 11.3544 6.28377 11.5721 6.55682 11.5721C6.47921 11.4097 6.46887 10.9628 6.02904 10.3048C5.4698 9.4686 5.07334 8.87277 4.85203 7.86498C4.6156 6.78874 4.58097 5.74553 4.84049 4.68123C4.94995 4.23306 5.09723 3.75145 5.28948 3.38806C5.03832 3.45533 4.37759 4.10211 4.14752 4.33176C3.53375 4.94511 3.23561 5.4693 2.86026 6.2128C2.53268 6.86118 2.25287 7.99235 2.25287 8.77366Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.28892 14.6612L5.60218 14.42C5.86688 14.2062 6.20681 13.7839 6.34492 13.4731C6.47031 13.1913 6.53518 12.9481 6.59568 12.5867C6.64265 12.3049 6.57141 12.3757 6.32224 12.3347C5.01509 12.119 4.37464 11.8691 3.28203 11.3882C3.01097 11.2688 2.79483 11.1248 2.54327 10.9918C2.71562 11.7317 3.30473 12.7025 3.80665 13.3186C3.97064 13.52 4.43037 14.0012 4.60192 14.1338L5.23002 14.6146C5.26265 14.6389 5.26426 14.6405 5.28854 14.6616L5.28892 14.6612Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.4139 12.3909C11.4139 13.0739 11.7845 13.7855 12.2251 14.246C12.2912 14.3149 12.6538 14.6349 12.7338 14.6349C12.9181 14.6349 13.8161 13.7541 14.0215 13.5463C14.5911 12.9708 15.0699 12.0832 15.3664 11.327C15.4063 11.2247 15.4381 11.1045 15.4799 11.0177C15.3768 11.0416 15.1583 11.1877 15.0488 11.2466C14.1182 11.7473 13.0391 12.0732 11.9927 12.2826C11.8044 12.32 11.5962 12.3479 11.4139 12.3905V12.3909Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.5396 12.5493H9.40785V15.77C10.2314 15.77 10.9861 15.5022 11.7013 15.212C11.7977 15.173 11.8884 15.1081 11.9951 15.0835C11.933 14.9911 11.8737 14.9772 11.7507 14.8526C11.6651 14.7662 11.5792 14.6934 11.5043 14.5971C11.3383 14.3837 11.2376 14.2878 11.0971 14.0275C11.0653 13.9686 11.0402 13.9376 11.0107 13.8763L10.803 13.3445C10.7341 13.1391 10.6481 12.7726 10.6481 12.4963C10.264 12.4963 9.94362 12.5493 9.53922 12.5493H9.5396Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.05462 15.0835C6.61864 15.382 7.761 15.77 8.61558 15.77V12.5493C8.14271 12.5493 7.77136 12.4963 7.37452 12.4963C7.37452 12.7491 7.2941 13.122 7.22644 13.325C7.11499 13.6585 7.09588 13.7163 6.93467 14.0104C6.81407 14.2305 6.68311 14.4005 6.53345 14.5859C6.39493 14.7583 6.12546 14.9772 6.05421 15.0835H6.05462Z" fill="white"/>
</svg>`;

const BASEBALL_SVG = `<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.80737 9.41364L8.21365 10.7144C8.35851 10.641 10.3035 9.14335 10.8764 8.70542C10.6416 6.99024 12.4794 5.64972 14.1542 6.20083C14.1972 6.16955 14.2403 6.13827 14.2826 6.10805C14.3655 6.0483 14.4293 5.99804 14.5112 5.93477C14.9238 5.61704 15.2604 5.22585 15.2604 4.62097C15.2604 3.75389 14.4443 3.00385 13.589 3.00385C12.3191 3.00385 11.9895 3.77251 11.075 4.73203L10.4937 5.37628C10.4245 5.45185 10.3722 5.51195 10.3023 5.58365C9.68909 6.21314 8.97174 7.08549 8.35851 7.71568C7.89244 8.19438 7.29304 8.9026 6.80737 9.41329V9.41364Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.2681 6.73636C12.3572 6.85832 12.6285 7.03616 12.8387 7.4646C13.251 8.30427 13.1607 9.13937 12.5882 9.88133C12.451 10.0588 12.3353 10.1214 12.2681 10.2135C12.8982 10.5994 13.7773 10.6605 14.4678 10.3505C14.5404 10.3179 14.6538 10.2479 14.7237 10.2328C14.7072 10.1769 14.5397 10.0335 14.4367 9.90945C13.6936 9.01319 13.7359 7.72189 14.5689 6.90753C14.6096 6.86781 14.6084 6.86008 14.6449 6.82071C14.6811 6.781 14.693 6.77853 14.7237 6.73636C14.6369 6.69453 14.5735 6.65587 14.4747 6.61264C13.8346 6.33146 13.1726 6.34517 12.5328 6.60807C12.4475 6.64322 12.3488 6.71667 12.2681 6.73636Z" fill="#159A42"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.2326 8.47487C14.2326 8.99681 14.5558 9.7451 15.0015 10.0182C15.4234 9.75986 15.7703 9.01614 15.7703 8.49456C15.7703 8.00777 15.5809 7.57475 15.2977 7.2275C15.217 7.12874 15.0898 6.9748 14.9803 6.9516C14.8808 7.01276 14.7736 7.14455 14.6964 7.2391C14.4144 7.58389 14.2326 7.99617 14.2326 8.47522V8.47487Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.2429 8.35781C11.2429 9.05583 11.3708 9.34966 11.8377 9.88425C11.8834 9.93627 11.9318 9.98196 11.9902 10.0182C12.394 9.77073 12.7591 9.07903 12.7591 8.55323C12.7591 7.97541 12.5773 7.46155 12.1562 7.07318C12.102 7.02327 12.0525 6.98742 12.0117 6.93188C11.8411 7.03627 11.5964 7.33818 11.4992 7.51779C11.3797 7.73816 11.2429 8.03235 11.2429 8.35781Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.52881 12.9417C3.06735 12.9417 3.26099 12.5596 2.66082 12.5596C2.33423 12.5596 2.12021 12.9751 2.34691 13.2288L3.60066 14.375C3.78855 14.5468 4.0552 14.8821 4.33184 14.8821C4.59926 14.8821 4.81404 14.7068 4.81404 14.4706C4.81404 13.9687 3.95452 13.9423 4.60272 13.4833L5.60402 12.7234C5.76808 12.6053 6.82356 11.8156 6.9031 11.7069L5.72199 10.6118C5.64399 10.7147 5.53487 10.816 5.45226 10.9087L3.8454 12.6728C3.78392 12.7427 3.6383 12.9417 3.52841 12.9417H3.52881Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.06757 10.2659L7.31323 11.4197L7.83539 11.0303L6.49367 9.78821C6.41452 9.83917 6.09599 10.1696 6.06794 10.2659H6.06757Z" fill="#159A42"/>
</svg>`;

const SPORT_ICON: Record<string, string> = {
  Football:   FOOTBALL_SVG,
  Tennis:     TENNIS_SVG,
  Basketball: BASKETBALL_SVG,
  Baseball:   BASEBALL_SVG,
};

function SpinningStar({ active }: { active: boolean }) {
  const spin = useRef(new Animated.Value(0)).current;
  const animRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (active) {
      spin.setValue(0);
      animRef.current = Animated.loop(
        Animated.timing(spin, {
          toValue: 1,
          duration: 1800,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      animRef.current.start();
    } else {
      animRef.current?.stop();
      animRef.current = null;
      spin.setValue(0);
    }
    return () => { animRef.current?.stop(); };
  }, [active]);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <SvgXml xml={STAR_SVG} width={18} height={17} />
    </Animated.View>
  );
}
import MatchRow from "@/components/home/MatchRow";
import { LiveMatch } from "@/mock/matches";
import { colors, radius } from "@/constants/theme";

const sectionTabs = ["Live", "Highlight", "Upcoming"] as const;
const sports = ["Football", "Tennis", "Basketball", "Baseball"] as const;
const markets = ["1×2", "Double Chance", "Over / Under", "Goal / No Goal"] as const;

type SectionTab = (typeof sectionTabs)[number];
type Sport = (typeof sports)[number];
type Market = (typeof markets)[number];

function SectionTabBar({
  active,
  onSelect,
}: {
  active: SectionTab;
  onSelect: (t: SectionTab) => void;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        height: 56,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      {sectionTabs.map((tab, index) => {
        const isActive = active === tab;
        return (
          <React.Fragment key={tab}>
            {/* White vertical divider between tabs */}
            {index > 0 && (
              <View
                style={{
                  width: 1,
                  height: 16,
                  backgroundColor: "#FFFFFF",
                  opacity: 0.3,
                  marginHorizontal: 12,
                }}
              />
            )}

            <TouchableOpacity
              onPress={() => onSelect(tab)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 3,
              }}
            >
              {tab === "Live" && <SpinningStar active={isActive} />}
              <Text
                style={{
                  fontFamily: "Inter",
                  fontSize: 16,
                  fontWeight: "600",
                  letterSpacing: 0,
                  color: isActive
                    ? tab === "Live" ? colors.brandGreen : colors.textPrimary
                    : colors.textSecondary,
                }}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          </React.Fragment>
        );
      })}
    </View>
  );
}

function SportFilterRow({
  active,
  onSelect,
}: {
  active: Sport;
  onSelect: (s: Sport) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 10,
        gap: 8,
      }}
    >
      {sports.map((sport) => {
        const isActive = active === sport;
        return (
          <TouchableOpacity
            key={sport}
            onPress={() => onSelect(sport)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 7.51,
              width: 93.03,
              height: 30.52,
              borderRadius: 3.75,
              padding: 7.51,
              backgroundColor: isActive ? colors.brandGreen : "transparent",
            }}
          >
            <SvgXml xml={SPORT_ICON[sport]} width={19} height={19} />
            <Text
              style={{
                color: isActive ? "#fff" : colors.textSecondary,
                fontSize: 12,
                fontWeight: "700",
              }}
            >
              {sport}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

function MarketFilterRow({
  active,
  onSelect,
}: {
  active: Market;
  onSelect: (m: Market) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 10,
        gap: 8,
      }}
    >
      {markets.map((market) => {
        const isActive = active === market;
        return (
          <TouchableOpacity
            key={market}
            onPress={() => onSelect(market)}
            style={{
              paddingHorizontal: 12,
              height: 41.4,
              borderRadius: 0,
              backgroundColor: "#3C3C44",
              alignItems: "center",
              justifyContent: "center",
              borderBottomWidth: isActive ? 2 : 0,
              borderBottomColor: "#159A42",
            }}
          >
            <Text
              style={{
                color: colors.textPrimary,
                fontFamily: "Inter",
                fontWeight: "500",
                fontSize: 12.42,
                lineHeight: 12.42,
                letterSpacing: 0,
              }}
            >
              {market}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

function ColumnHeaders() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 7,
        backgroundColor: "#1C1F26",
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      {/* small spacer — keeps Today near the left edge */}
      <View style={{ width: 8 }} />
      <Text
        style={{
          flex: 1,
          color: colors.textSecondary,
          fontSize: 10,
          fontWeight: "700",
          lineHeight: 20.31,
          textAlignVertical: "center",
        }}
      >
        Today
      </Text>
      {/* 1 / X / 2 aligned to the three OddsPill columns */}
      <View style={{ flexDirection: "row", width: 235.6, gap: 20.1 }}>
        {["1", "X", "2"].map((h) => (
          <Text
            key={h}
            style={{
              flex: 1,
              textAlign: "center",
              color: colors.textSecondary,
              fontSize: 10.83,
              fontWeight: "700",
              lineHeight: 13.54,
              textAlignVertical: "center",
            }}
          >
            {h}
          </Text>
        ))}
      </View>
    </View>
  );
}

interface LiveMatchesSectionProps {
  matches: LiveMatch[];
}

export default function LiveMatchesSection({ matches }: LiveMatchesSectionProps) {
  const [sectionTab, setSectionTab] = useState<SectionTab>("Live");
  const [sport, setSport] = useState<Sport>("Football");
  const [market, setMarket] = useState<Market>("1×2");

  return (
    <View style={{ backgroundColor: colors.bgPrimary }}>
      <SectionTabBar active={sectionTab} onSelect={setSectionTab} />
      <SportFilterRow active={sport} onSelect={setSport} />
      <MarketFilterRow active={market} onSelect={setMarket} />
      <ColumnHeaders />
      {matches.map((m) => (
        <MatchRow key={m.id} match={m} />
      ))}
    </View>
  );
}
