<ri-header>
  <header class="header">
    <section class="panel-blank">
      <img src="/img/logo-blank.svg" class="logo">
      <img src="/img/logo-notext-blank.svg" class="logo-notext">
    </section>
  </header>

  <style>
    .header {
      background: #2294ff;
      padding: 1rem 0;
      margin: 0 0 1rem 0;
    }

    .logo {
      height: 2rem;
    }

    .logo-notext {
      display: none;
      height: 2rem;
    }

    @media(max-width: 1050px) {
      .header {
        padding: .5rem 1rem;
        margin: 0;
        text-align: center;
      }

      .logo {
        display: none;
      }

      .logo-notext {
        display: inline-block;
      }
    }
  </style>
</ri-header>
