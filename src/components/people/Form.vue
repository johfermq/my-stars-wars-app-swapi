<template>
  <form>
    <div class="form-group row">
      <div class="col-md-3">
        <label class="col-form-label">Título</label>
        <input
          type="text"
          class="form-control"
          v-model.trim="form.name"
          aria-describedby="nombre y/o especie"
          placeholder="Nombre o especie..."
          :class="{ ' is-invalid': $v.form.name.$error }"
        >
        <span
          v-if="!$v.form.name.alpha"
          class="invalid-feedback" role="alert">
            <strong>Sólo puede digitar letras.</strong>
        </span>
      </div>
      <div class="col-md-5">
        <label class="col-form-label">Planeta de origen</label>
        <Multiselect
          v-model="form.homeworld"
          :options="planets"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          placeholder="Seleccione algunos..." />
      </div>
      <div class="col-md-2">
        <label class="col-form-label">Género</label>
        <select class="form-control" v-model.trim="form.gender">
          <option value="">Seleccione...</option>
          <option v-for="gender in genders" :key="gender" :value="gender">
            {{ gender }}
          </option>
        </select>
      </div>
      <div class="col-md-2">
        <label class="col-form-label">Año de nacimiento</label>
        <select class="form-control" v-model.trim="form.birth_year">
          <option value="">Seleccione...</option>
          <option v-for="birth_year in birth_years" :key="birth_year" :value="birth_year">
            {{ birth_year }}
          </option>
        </select>
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';
import { alpha } from 'vuelidate/lib/validators';
import Multiselect from 'vue-multiselect';

export default {
  name: 'Form',
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  components: {
    Multiselect
  },
  data: () => ({
    genders: [
      'female', 'male', 'hermaphrodite', 'none', 'n/a'
    ],
    birth_years: [
      '1 - 25', '26 - 50', '51 - 100', '101 - 500', '501 - 1000', 'unknown'
    ],
  }),
  validations: {
    form: {
      name: {
        alpha,
      },
    }
  },
  computed: mapGetters(['planets']),
  watch: {
    form: {
      handler (val) {
        this.$v.$touch();
        this.form.name = val.name.toLowerCase();
        this.form.isValid = ! this.$v.$invalid;
      },
      deep: true,
    },
  },
}
</script>

<style scoped>
  @import '~vue-multiselect/dist/vue-multiselect.min.css';
</style>