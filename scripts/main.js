
const app = Vue.createApp({
    data(){
        return{
            info: [{}],
            moreInfo: {},
            isHidden: true,
            id: 0,
            research: '',
            attente: {},
            page: 0,
            nextIsHidden: false,
            prevIsHidden: true,
            all: [{}],
        }
    },
    methods:{
        printIndex(info){
            return this.info.indexOf(info) + 1 + this.page
        } ,

        getSrc(indice){
            return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/"+indice+".svg" 
        },

        async getMore(id){ //au clic sur un des pokémons, on récupère toutes les infos supplémentaires et on les place dans un tableau moreInfo. Est fonctionnelle, le problème vient de getInfo
                await axios
                .get('https://pokeapi.co/api/v2/pokemon/'+id)
                .then(response => this.moreInfo = (response.data) )
                this.isHidden = false 
                this.id = this.moreInfo.id
                console.log(this.moreInfo)
                //return this.moreInfo; 
        },

        getResearch(){ //on récupère la valeur rentrée par l'utilisateur
            console.log(this.$refs.input.value)
            this.research = this.$refs.input.value
        },

        async printResearch(){ //on cherche dans le tableau si un pokémon correspond bien à la valeur rentrée
            this.getResearch()
            this.attente= this.all.find(el => el.name == this.research) //dans attente j'ai le nom et l'url de mon pokémon
            await axios.get(this.attente.url).then(response => this.moreInfo = (response.data))
            this.id = this.moreInfo.id
            console.log(this.moreInfo)
            this.isHidden = false
        },

        async nextPage(){
            if(this.page==500){
                this.page+=50;
                this.nextIsHidden=true;
            }
            else{
                this.page+=50;
                console.log(this.page)
            }
            if(this.page>49){
                this.prevIsHidden=false
            }
            await axios.get("https://pokeapi.co/api/v2/pokemon?offset="+this.page+"&limit=50")
            .then(response => this.info=(response.data.results))   
        },

        async prevPage(){
            if(this.page>50){
                this.page-=50;
            }
            else{
                this.page-=50;
                console.log(this.page)
            }
            if(this.page==0){
                this.prevIsHidden=true
            }
            if(this.page==500){
                this.nextIsHidden=true
            }
            if(this.page==500){
                this.nextIsHidden=false
            }
            console.log(this.page)
            await axios.get("https://pokeapi.co/api/v2/pokemon?offset="+this.page+"&limit=50")
            .then(response => this.info=(response.data.results))    
        },



    },
    mounted () {
        axios
          .get('https://pokeapi.co/api/v2/pokemon?limit=50')
          .then(response => this.info = (response.data.results))
      },

      created(){
        axios
        .get('https://pokeapi.co/api/v2/pokemon?limit=600')
        .then(response => this.all = (response.data.results))
      }
})