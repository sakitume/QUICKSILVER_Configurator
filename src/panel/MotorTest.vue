<template>
  <div class="card" v-if="motor.test">
    <header class="card-header">
      <p class="card-header-title">Motor Test</p>
      <small class="card-header-icon">
        {{ state.vbat.toFixed(2) }}V <br />
        {{ state.ibat_filtered.toFixed(2) }}mAh
      </small>
      <tooltip class="card-header-icon" entry="motor.test" size="lg" />
    </header>

    <div class="card-content">
      <div class="content">
        <template v-if="motor.test.active">
          <div class="columns is-multiline">
            <div class="column is-6" v-for="m in motor.pins" :key="m.index">
              <div class="field field-is-2 is-horizontal">
                <div class="field-label">
                  <label class="label" for="pid-preset">
                    {{ m.label }}
                  </label>
                </div>
                <div class="field-body">
                  <div class="field has-addons">
                    <div class="control is-expanded">
                      <input
                        class="input"
                        :id="m.id"
                        type="range"
                        step="1"
                        min="0"
                        max="50"
                        v-model.number="value[m.index]"
                        @input="update()"
                      />
                    </div>
                    <div class="control">
                      <input
                        class="input"
                        :id="m.id"
                        type="number"
                        step="1"
                        min="0"
                        max="50"
                        v-model.number="value[m.index]"
                        @change="update()"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="is-size-5 has-text-centered has-text-weight-semibold">
            Motor Test disabled
          </div>
        </template>
      </div>
    </div>

    <footer class="card-footer">
      <span class="card-footer-item"></span>
      <span class="card-footer-item"></span>
      <spinner-btn class="card-footer-item" @click="motor.motor_test_toggle()">
        {{ motor.test.active ? "Disable" : "Enable" }}
      </spinner-btn>
    </footer>
  </div>
</template>

<script lang="ts">
import { useMotorStore } from "@/store/motor";
import { useStateStore } from "@/store/state";
import { defineComponent } from "vue";

export default defineComponent({
  name: "MotorTest",
  setup() {
    return {
      motor: useMotorStore(),
      state: useStateStore(),
    };
  },
  computed: {
    value() {
      return this.motor.test.value.map((v) => v * 100);
    },
  },
  methods: {
    update() {
      return this.motor.motor_test_set_value(this.value.map((v) => v / 100));
    },
  },
  created() {
    this.motor.fetch_motor_test();
  },
});
</script>
