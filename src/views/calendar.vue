<template>
  <div id="calendar">
    <div class="container" v-if="store.state == false">
      <div v-if="errormsg" class="alert alert-danger">
        {{ errormsg }}
      </div>
      <div class="jumbotron">
        <h1 class="display-4">Upis radnih sati</h1>
        <hr class="my-4" />
        <img
          src="https://i.ibb.co/zmBCGtv/logo.png"
          alt="logo"
          width="350"
          height="100"
        />
        <hr />
      </div>
      <form @submit.prevent="kalendar">
        <div class="container">
          <div class="row">
            <div class="col-sm">
              <h2>Odaberi datum:</h2>
              <DatePicker v-model="range" is-range />
            </div>

            <div class="col-sm">
              <br /><br />
              <div class="form-group row">
                <label for="inputPassword" class="col-sm-6 col-form-label"
                  >Broj radnih sati</label
                >
                <div class="col-sm-4">
                  <input
                    required
                    type="number"
                    class="form-control"
                    id="inputPassword"
                    placeholder="Hours"
                    min="0"
                    v-model.number="brsati"
                  />
                </div>
              </div>
              <br />
              <div class="form-group row">
                <label for="inputPassword" class="col-sm-6 col-form-label"
                  >Prekovremeni</label
                >
                <div class="col-sm-4">
                  <input
                    required
                    type="number"
                    class="form-control"
                    id="inputPassword"
                    placeholder="Hours"
                    min="0"
                    v-model.number="prekovremeni"
                  />
                </div>
              </div>

              <br />
              <div class="form-group row">
                <label for="inputPassword" class="col-sm-6 col-form-label"
                  >Rad vikendom/blagdanom</label
                >
                <div class="col-sm-4">
                  <input
                    required
                    type="number"
                    class="form-control"
                    id="inputPassword"
                    placeholder="Hours"
                    min="0"
                    v-model.number="blagdan"
                  />
                </div>
              </div>
              <br />
              <div class="form-group row">
                <label for="inputPassword" class="col-sm-6 col-form-label"
                  >Noćni rad</label
                >
                <div class="col-sm-4">
                  <input
                    required
                    type="number"
                    class="form-control"
                    id="inputPassword"
                    placeholder="Hours"
                    min="0"
                    v-model.number="nocni"
                  />
                </div>
              </div>
              <br />
              <div class="form-group row">
                <label for="inputPassword" class="col-sm-6 col-form-label"
                  >Odsutan</label
                >
                <div class="col-sm-4">
                  <input
                    required
                    type="number"
                    class="form-control"
                    id="inputPassword"
                    placeholder="Hours"
                    min="0"
                    v-model.number="odsutan"
                  />
                </div>
              </div>
              <br />

              <div class="form-group col-md-5">
                <label for="inputState">Rad od kuće</label>
                <select
                  required
                  v-model="posaoodkuce"
                  id="inputState"
                  class="form-control"
                >
                  <option selected>NE</option>
                  <option>DA</option>
                </select>
              </div>
              <br />
              <div class="form-group col-md-10">
                <label for="exampleFormControlTextarea1">Napomena: </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  v-model="napomena"
                ></textarea>
              </div>
            </div>
            <div class="col-sm">
              <h2>Status:</h2>
              <p>
                <i>Ukupno sati: {{ suma }}</i>
              </p>
              <p>Odabrani datumi:</p>
              <p>
                <b>od {{ formattedDateStart }} do {{ formattedDateEnd }}</b>
              </p>
              <br />
              <h2>Upload potpisa:</h2>
              <input
                type="file"
                name="pic"
                accept="image/png, image/jpeg"
                @change="onFileChange"
                required
              />
              <p>Maksimalna veličina do 500 KB!</p>
              <br />
              <hr />
              <button
                class="btn btn-primary btn-lg"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasBottom"
                aria-controls="offcanvasWithBothOptions"
              >
                Pošalji
              </button>
            </div>
          </div>
        </div>

        <div
          class="offcanvas offcanvas-bottom"
          tabindex="-1"
          id="offcanvasBottom"
          aria-labelledby="offcanvasBottomLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasBottomLabel">
              Prijava sati
            </h5>
            <button
              type="button"
              class="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body small">
            <h6>
              Pocetak: {{ formattedDateStart }} | Kraj: {{ formattedDateEnd }} |
              Ukupno sati: {{ suma }}
            </h6>

            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Radni sati</th>
                  <th>Prekovremeno</th>
                  <th>rad vikendom</th>
                  <th>nocni rad</th>
                  <th>odsutan</th>
                  <th>rad od kuce</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ brsati }}</td>
                  <td>{{ prekovremeni }}</td>
                  <td>{{ blagdan }}</td>
                  <td>{{ nocni }}</td>
                  <td>{{ odsutan }}</td>
                  <td>{{ posaoodkuce }}</td>
                </tr>
              </tbody>
            </table>

            <input
              required
              class="form-check-input"
              type="checkbox"
              id="gridCheck1"
            />
            <label class="form-check-label" for="gridCheck1">
              Potvrđujem točnost podataka i želim unijeti sate </label
            ><br />

            <button type="submit" class="btn btn-success btn-lg">
              Pošalji
            </button>
          </div>
        </div>
      </form>
    </div>
    <br /><br />
  </div>
</template>

<script>
import { Calendar, DatePicker } from "v-calendar";
import { Podaci } from "@/services";
import { Auth } from "@/services";
import store from "@/store.js";

export default {
  name: "calendar",
  components: {
    Calendar,
    DatePicker,
  },
  methods: {
    onFileChange(e) {
      const selected = e.target.files[0];
      this.img = selected;
    },
    currentDate() {
      const current = new Date();
      return current.getMonth;
    },
    async kalendar() {
      const fd = new FormData();
      if (this.img != null) {
        let podaci = {
          br_sati: this.brsati,
          prekovremeni: this.prekovremeni,
          blagdan: this.blagdan,
          nocni_rad: this.nocni,
          odsutan: this.odsutan,
          rad_od_kuce: this.posaoodkuce,
          napomena: this.napomena,
          datum_obavljanja_pocetak: this.range.start,
          datum_obavljanja_kraj: this.range.end,
          email: Auth.state.email,
          korisnik_id: Auth.state.id,
          postavljeno: Date.now(),
        };
        let id;
        try {
          id = await Podaci.datumi(podaci);
        } catch (e) {
          this.errormsg = e.message;
        }
        let slikaa;
        if (id.data != null) {
          fd.append("image", this.img, id.data);
          try {
            slikaa = await Podaci.slika(fd);
            $("#offcanvasBottom").offcanvas("hide");
            this.$router.push({ path: "/korisnik" });
          } catch (e) {
            this.errormsg = e.message;
            await Podaci.deletespecificdata(id.data);
            this.brsati = "";
            this.prekovremeni = "";
            this.blagdan = "";
            this.nocni = "";
            this.odsutan = "";
            this.posaoodkuce = "";
            this.napomena = "";
          }
        }
      }
      /*else{
        console.log("drugi")
        let podaci={
          br_sati:this.brsati,
          prekovremeni:this.prekovremeni,
          blagdan:this.blagdan,
          nocni_rad:this.nocni,
          odsutan:this.odsutan,
          rad_od_kuce:this.posaoodkuce,
          napomena:this.napomena,
          datum_obavljanja_pocetak:this.range.start,
          datum_obavljanja_kraj:this.range.end,
          email:Auth.state.email,
          korisnik_id:Auth.state.id,
          postavljeno:Date.now()
        }
        try{
        await Podaci.datumi(podaci).then(()=>{
          $("#offcanvasBottom").offcanvas("hide");
        this.$router.push({path: "/korisnik"})})
      }catch(e){
        this.errormsg=e.message
      }
    }*/
    },
  },
  data() {
    return {
      store,
      brsati: null,
      prekovremeni: null,
      blagdan: null,
      nocni: null,
      odsutan: null,
      posaoodkuce: null,
      napomena: null,
      img: null,
      image: null,
      errormsg: "",
      range: {
        start: new Date(),
        end: new Date(),
      },
    };
  },
  computed: {
    suma: function () {
      return (
        this.brsati +
        this.prekovremeni +
        this.blagdan +
        this.nocni -
        this.odsutan
      );
    },
    formattedDateStart() {
      return moment(this.range.start).format("DD-MM-YYYY");
    },
    formattedDateEnd() {
      return moment(this.range.end).format("DD-MM-YYYY");
    },
    provjera: function () {
      if (this.napomena == "") return (this.napomena = null);
    },
  },
};
</script>

<style>
h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  margin: 40px 8px 10px 8px;
  color: #cccccc;
}
</style>