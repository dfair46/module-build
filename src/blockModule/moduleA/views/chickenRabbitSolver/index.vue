<template>
  <div class="container">
    <h1>鸡兔同笼问题</h1>
    <div class="form">
      <input
          type="number"
          v-model="totalHeads"
          placeholder="请输入总数量"
          @keyup.enter="solve"
      />
      <input
          type="number"
          v-model="totalLegs"
          placeholder="请输入总腿数"
          @keyup.enter="solve"
      />
      <button @click="solve">计算</button>
    </div>
    <div v-if="true" class="result">
      <p>{{ result }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const totalHeads = ref<number | null>(123);
const totalLegs = ref<number | null>(123);
const result = ref<string>('');

const solve = () => {

  result.value = '请输入总数量和总腿数';
  console.log('solvesolvesolvesolvesolve', result.value)

  if (totalHeads.value === null || totalLegs.value === null) {
    result.value = '请输入总数量和总腿数';
    return;
  }

  const heads = totalHeads.value;
  const legs = totalLegs.value;

  // 通过鸡兔同笼公式计算：
  // 鸡的数量 = (4 * heads - legs) / 2
  // 兔的数量 = (legs - 2 * heads) / 2
  const chickens = (4 * heads - legs) / 2;
  const rabbits = (legs - 2 * heads) / 2;

  if (
      chickens >= 0 &&
      rabbits >= 0 &&
      Number.isInteger(chickens) &&
      Number.isInteger(rabbits)
  ) {
    result.value = `🐔 鸡的数量：${chickens}，🐇 兔的数量：${rabbits}`;
  } else {
    result.value = '无解，请检查输入值';
  }
};
</script>

<style lang="scss">
.container {
  max-width: 400px;
  margin: 30px auto;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  text-align: center;
}

h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.form input,
.form button {
  width: calc(50% - 10px);
  padding: 10px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
}

.form button {
  background-color: #42b983;
  color: #fff;
  cursor: pointer;
  transition: background 0.3s;
}

.form button:hover {
  background-color: #369e6f;
}

.result {
  margin-top: 20px;
  font-size: 18px;
  color: #555;
}
</style>