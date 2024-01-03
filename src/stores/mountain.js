import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useBoardStore } from '@/stores/board'
import axios from 'axios'

const REST_MOUNTAIN_API = 'http://localhost:8080/api/mountain'



export const useMountainStore = defineStore('mountain', () => {

    const mountains = ref([]);
    const boardStore = useBoardStore()
    
    const findAllMountain = (id) =>{
      axios.get(`${REST_MOUNTAIN_API}/${id}`)
      .then((res)=>{
        mountains.value = res.data;
      }).catch((error) => {
        // 오류 처리
        console.error('Error fetching mountain data:', error);
      });
    };
    
    // 해당되는 로케이션 ID의 산 불러오기
    //state
    const location_id = ref("")
    const mountain_id = ref("")
    let result = ref({})
    let mounT = ref({})
    
    
    // getter
    const getMounT = computed(()=>{
      return mounT.value;
    })
    
    const getMountain = async function () {
        try {
          const locationId = location_id.value;
          const mountainId = mountain_id.value;
      
          const response = await axios.get(`${REST_MOUNTAIN_API}/${locationId}/${mountainId}`);
          
          mounT.value = response.data;
      
          await boardStore.getBoardList(mounT.value.location_id, mounT.value.mountain_id);
        } catch (error) {
          // 오류 처리
          console.error('Error fetching mountain data:', error);
        }
      };

    // getter
    const getMount = computed(() => {
        return mounT.value;
      });

    return {mounT, result, getMount, getMounT, getMountain, location_id, mountain_id, findAllMountain, mountains}
}, {persist:true})

   
