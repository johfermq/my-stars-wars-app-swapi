<template>
  <form>
    <div class="form-group row">
      <div class="col-md-3">
        <label class="col-form-label">Título</label>
        <input
          type="text"
          class="form-control"
          v-model.trim="form.title"
          aria-describedby="título"
          placeholder="Título..."
          :class="{ ' is-invalid': $v.form.title.$error }"
        >
        <span
          v-if="!$v.form.title.alpha"
          class="invalid-feedback" role="alert">
            <strong>Sólo puede digitar letras.</strong>
        </span>
      </div>
      <div class="col-md-2">
        <label class="col-form-label">Episodio</label>
        <vue-slider v-model="form.episode" :min="1" :max="7" class="mt-md-2" />
      </div>
      <div class="col-md-3">
        <label class="col-form-label">Director</label>
        <select class="form-control" v-model.trim="form.director">
          <option value="">Seleccione...</option>
          <option v-for="director in directors" :key="director" :value="director">
            {{ director }}
          </option>
        </select>
      </div>
      <div class="col-md-4">
        <label class="col-form-label">Fecha de estreno</label>
        <DatePicker
          v-model="form.date"
          range
          lang="es"
          :confirm="true"
          width="100%"
          input-class="form-control"
          placeholder="Rango de fechas..." />
      </div>
    </div>
  </form>
</template>

<script>
import { alpha } from 'vuelidate/lib/validators';
import VueSlider from 'vue-slider-component';
import DatePicker from 'vue2-datepicker';

export default {
  name: 'Form',
  components: {
    VueSlider,
    DatePicker
  },
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    directors: [
      'George Lucas', 'Irvin Kershner', 'J. J. Abrams', 'Richard Marquand'
    ],
  }),
  validations: {
    form: {
      title: {
        alpha,
      },
    }
  },
  watch: {
    form: {
      handler (val) {
        this.$v.$touch();
        this.form.title = val.title.toLowerCase();
        this.form.isValid = ! this.$v.$invalid;
      },
      deep: true,
    },
  },
}
</script>

<style scoped>
  @import '~vue-slider-component/theme/default.css';
</style>