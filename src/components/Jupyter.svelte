<script lang="ts">
  let val = 0;

  let loading = false;
  function handleClick() {
    const tmp = val;
    if (loading) return;
    loading = true;
    val = 0;
    setTimeout(() => {
      val = tmp + 1;
      loading = false;
    }, time(tmp));
  }

  function time(n: number): number {
    if (n < 1) {
      return 750;
    } else if (n < 4) {
      return 333;
    } else {
      return 150;
    }
  }

  function getlen(n: number): number {
    if (n < 10) {
      return 1;
    }
    return 1 + getlen(Math.floor(n / 10));
  }

  $: transformValue = `translate(-${44 + getlen(val) * 11.78}px, 0)`;

  type TableDataProp = {
    key: string;
    value: string;
  }[];

  let tableData: TableDataProp = [
    { key: "Name", value: "Saran" },
    {
      key: "About",
      value: "AI & DS Undergrad @ SNUC\nWebdev and AI/ML Engineer",
    },
    {
      key: "Resume",
      value:
        "<a style='color: var(--magenta)' href='https://youtu.be/dQw4w9WgXcQ'>Download CV</a>",
    },
    {
      key: "Projects",
      value:
        "I should update this section...\nCheck <a style='color: var(--magenta)' href='https://github.com/try3d'>my github</a> for now",
    },
    {
      key: "Tech",
      value:
        "- Webdev\n    - React\n    - Svelte\n    - Tailwind.CSS\n    - Flask\n- ML Libraries\n    - Pytorch\n    - Tensorflow\n    - Scikit-learn\n    And many more...",
    },
  ];

  $: cur = tableData[(val + 4) % 5];
</script>

<main>
  <div class="parent">
    <div class="cell">
      <div class="i" style="transform: {transformValue}">
        {#if loading}
          [*]
        {:else}
          [{val == 0 ? " " : val}]
        {/if}
      </div>
      <div class="menu" id="menu">
        <button on:click={handleClick}>
          <img src="/images/play.png" alt="run" />
        </button>
      </div>
      <div>
        <span class="blue">from</span> try3d <span class="blue">import</span>
        <span class="cyan">Info</span>
      </div>
      <div>
        <span class="blue">from</span> Ipython.display
        <span class="blue">import</span> <span class="yellow">HTML</span>,
        display
      </div>
      <div style="height: 20px;"></div>
      <div>model = <span class="magenta">Info</span>()</div>
      <div style="height: 20px;"></div>
      <div>
        <span class="yellow">Y</span> = model.<span class="blue">predict</span
        >(<span class="yellow">X</span>)
      </div>
      <div style="height: 20px;"></div>
      <div>
        <span class="blue">display</span>(<span class="magenta">HTML</span
        >(<span class="yellow">Y</span>))
      </div>
    </div>
  </div>

  {#if loading}
    <div>running...</div>
  {:else if val > 0}
    <table>
      <tr>
        <th style="width: 100px;">{@html cur.key}</th>
        <td style="text-wrap: wrap">{@html cur.value}</td>
      </tr>
    </table>
  {/if}
</main>

<style>
  main {
    font-size: 26px;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
  }

  button {
    margin: 0px 7px 0px 0px;
    background: transparent;
    border: transparent;
  }

  img {
    width: 20px;
  }

  .menu {
    position: absolute;
    right: 0;
    transform: translateX(-5px);
  }

  .i {
    position: absolute;
  }

  .parent {
    width: var(--viewport-width);
    margin: 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
  }

  .cell {
    overflow-x: auto;
    width: 100%;
    padding: 10px;
    border: 2px dashed var(--foreground-color);
  }

  td,
  tr {
    white-space: pre;
  }

  table {
    width: var(--viewport-width);
    border-collapse: collapse;
  }

  th,
  td {
    border: 2px dashed var(--foreground-color);
    padding: 8px;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
  }

  td {
    text-align: left;
  }

  .magenta {
    color: var(--magenta);
  }

  .blue {
    color: var(--blue);
  }

  .cyan {
    color: var(--cyan);
  }

  .yellow {
    color: var(--yellow);
  }
</style>
