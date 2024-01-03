import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useMountainStore } from './mountain';
import axios from "axios";
import proj4 from 'proj4';

export const useMountainApiStore = defineStore('mountain_api', () => {

    let mountain_list = ref([])
    let maxUpTime = ref(0);
    let difficulty = ref("");

    // getter for difficulty
    const getDifficulty = computed(()=>{
        return difficulty
    })

    // getter for maxUpTime
    const getMaxUpTime = computed(()=>{
        return maxUpTime
    })

    // getter for mountainList
    const getMountainList = computed(()=>{
        return mountain_list;
    })
    
    const mountainStore = useMountainStore()
    const getAllJson = async function () {
        // 사용을 위해 초기화 하자
        maxUpTime.value = 0;
        mountain_list.value = [];

        // 현재 지역에 해당하는 산들의 정보를 들고오자
        let jsonFilePath = '../../public/Json/PMNTN_' + mountainStore.getMounT.mountain + '.json';
        // Axios를 사용하여 JSON 파일 받아오기
        await axios.get(jsonFilePath)
            .then(response => {
                const data = response.data;
                const features = data.features
                // console.log('JSON 데이터:', data);
                // console.log('JSON features:', features)
                difficulty.value = features[1].attributes.PMNTN_DFFL  
                // 해당 산의 모든 등산 구간에 대한 정보가 들어있다.
                for (let i = 0; i < features.length; i++) {
                    let mountain = ref({
                        mountain_name: "",
                        mountain_load: "",
                        difficulty: "",
                        up_time: "",
                        down_time: "",
                        load_length: 0.0, // guess it's km
                        lat_lon: [],
                    })
                    mountain.value.mountain_name = features[i].attributes.MNTN_NM   // 산 이름
                    mountain.value.mountain_load = features[i].attributes.PMNTN_NM  // 산 내 등산 구간?
                    mountain.value.difficulty = features[i].attributes.PMNTN_DFFL   // 난이도 (it was confirmed by 산림청)
                    mountain.value.up_time = features[i].attributes.PMNTN_UPPL      // 상행 시간 (maybe minute)
                    mountain.value.down_time = features[i].attributes.PMNTN_GODN    // 하행 시간 (maybe minute)
                    mountain.value.load_length = features[i].attributes.PMNTN_LT    // 길이 (maybe km)

                    if(maxUpTime.value < mountain.value.up_time)
                        maxUpTime.value = mountain.value.up_time;

                    // 좌표가 [경도, 위도] 형태의 ITRF_2000_TM_Korea_Central_Belt형태로
                    // 여러가지 데이터를 들고있다.
                    // 아마 polygon을 그리기 위해서
                    for (let j = 0; j < features[i].geometry.paths[0].length; j++) {

                        // 여기서 
                        // [경도, 위도] 값을 들고 있다.
                        const itrf_data = features[i].geometry.paths[0][j]
                        // Proj4js에서 ITRF_2000_TM_Korea_Central_Belt와 WGS84 좌표계를 정의
                        const itrf2000 = '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs';
                        const wgs84 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';

                        // GRS80 좌표를 WGS84로 변환
                        // [경도, 위도] 반환 maybe
                        // kakao는 위도(latitude), 경도(longtitude) 이므로 바꿔주자
                        const wgs84Coordinates = proj4(itrf2000, wgs84, itrf_data);
                        mountain.value.lat_lon.push([wgs84Coordinates[1], wgs84Coordinates[0]])
                    }
                    mountain_list.value.push(mountain)
                }
            })
            .catch(error => {
                console.error('데이터를 받아오는 중 오류 발생:', error);
                maxUpTime.value = 30
                difficulty.value = "알 수 없음"
            });
    }

    return { getAllJson, getMountainList, mountain_list, getDifficulty, maxUpTime, getMaxUpTime, mountainStore}
}, { persist: true })


