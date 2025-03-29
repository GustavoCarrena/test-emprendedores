<template>
  <div class="card flex justify-center">
    <Stepper
      class="basis-[50rem]"
      value="1"
      linear
      @update:value="handleStepChange"
    >
      <StepList>
        <Step
          v-for="step in steps"
          :key="step.id"
          :class="activeStep === step.id ? 'step' : 'inactive'"
        >
          <template #default>
            <div class="step-content">
              <Knob
                v-model="step.value"
                :size="activeStep === step.id ? 100 : 80"
                readonly
                :min="0"
                :max="4"
                valueColor="#3E5A7E"
                textColor="#3E5A7E"
              />
              <div class="flex flex-col items-baseline">
                <span>{{ step.title }}</span>
                <span>{{ step.subtitle }}</span>
              </div>
            </div>
          </template>
        </Step>
      </StepList>
      <StepPanels>
        <StepPanel
          v-for="step in steps"
          :key="`panel-${step.id}`"
          v-slot="{ activateCallback }"
          :value="step.id.toString()"
        >
          <Questions v-if="data" :data="filteredQuestions" />
          <div
            class="flex pt-6"
            :class="step.showBack ? 'justify-between' : 'justify-end'"
          >
            <Button
              v-if="step.showBack"
              label="Back"
              severity="secondary"
              icon="pi pi-arrow-left"
              :loading="isPending"
              @click="activateCallback((step.id - 1).toString())"
            />
            <Button
              v-if="step.showNext"
              label="Next"
              icon="pi pi-arrow-right"
              iconPos="right"
              :loading="isPending"
              @click="activateCallback((step.id + 1).toString())"
            />
          </div>
        </StepPanel>
      </StepPanels>
    </Stepper>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import Button from 'primevue/button'
import Stepper from 'primevue/stepper'
import StepList from 'primevue/steplist'
import StepPanels from 'primevue/steppanels'
import Step from 'primevue/step'
import StepPanel from 'primevue/steppanel'
import Knob from 'primevue/knob'
import Questions from '@/components/questions/Questions.vue'
import { useQuestions } from '@/composables/questions.js'

const activeStep = ref(1)

const { data, isPending } = useQuestions()

const filteredQuestions = computed(() => {
  return data.value.filter((q) => q.id === activeStep.value)
})

const steps = computed(() => {
  if (!data.value || data.value.length === 0) return []
  return data.value.map((step, index) => ({
    id: step.id,
    title: `Eje ${step.id} de ${data.value.length}`,
    subtitle: step.titulo,
    value: index + 1,
    showBack: index !== 0,
    showNext: index !== data.value.length - 1,
  }))
})

const handleStepChange = (step) => {
  activeStep.value = Number(step)
}
</script>

<style scoped lang="scss">
:deep(.p-step-number) {
  display: none;
}

:deep(.p-knob-text) {
  background: blue;
  color: red !important;
}

:deep(.p-stepper-separator) {
  display: none;
}

.step {
  opacity: 1.3;
  @media (max-width: 767px) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .step-content {
    @media (max-width: 767px) {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }
  }
}

.inactive {
  opacity: 0.3;
  @media (max-width: 767px) {
    display: none;
  }
}
</style>
