<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modais com Menu Superior e Inferior</title>
    <link rel="stylesheet" href="../style.css">

    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

</head>
<body>

    <div class="container">
        <div class="menu-superior">
                <img src="imagens/afilado-menu-inferior.png" alt="irina-blok" class="img-logo">         
            <div class="links">
                <a href="#" onclick="openModal('cadastro')">Cadastro</a>
                <a href="#" onclick="openModal('login')">Entrar</a>
            </div>
        </div>

        <div class="menu-inferior">
            <ul class="menu-ul-inferior">
                    <!--home-->
                <li class="li-menu-inferior" onclick="returnToBody()"><span class="material-symbols-outlined" id="home">other_houses <div class="p-span">inicio</div></span></li>
                <!--carteira-->
                <li class="li-menu-inferior" onclick="openModal(2)"><span class="material-symbols-outlined">account_balance_wallet <div class="p-span">Depósito</div></span></li>
                <!--afilado-->
                <li class="li-menu-inferior" onclick="openFullscreenModal()"><div class="p-span"><img src="imagens/afilado-menu-inferior.png" alt="foto" class="img-afiliado-menu-inferior"><div class="p-span">Afiliados</div></div></li>
                <!--promoção-->
                <li class="li-menu-inferior" onclick="openModal(4)"><span class="material-symbols-outlined">featured_seasonal_and_gifts <div class="p-span">Promoção</div></span></li>
                <!--perfil-->
                <li class="li-menu-inferior" onclick="openModal()"><span class="material-symbols-outlined">account_circle <div class="p-span">Perfil</div></span></li>
            </ul>
        </div>

        <!-- Modal Cadastro -->
        <div id="modal-cadastro" class="modal small">
            <span class="close-btn" onclick="closeModal('cadastro')">X</span>
            <h2>Cadastro</h2>
            <p>Preencha seus dados para se cadastrar.</p>
            <form action="php/cadastro.php" method="POST">
                <input type="text" name="nome" placeholder="Nome" required><br>
                <input type="email" name="email" placeholder="Email" required><br>
                <input type="password" name="senha" placeholder="Senha" required><br>
                <button type="submit">Cadastrar</button>
            </form>
            <a href="#" onclick="openModal('login')">Já tem uma conta? Entre aqui</a>
        </div>

        <!-- Modal Login -->
        <div id="modal-login" class="modal small">
            <span class="close-btn" onclick="closeModal('login')">X</span>
            <h2>Login</h2>
            <p>Insira seus dados para entrar.</p>
            <form action="php/login.php" method="POST">
                <input type="email" name="email" placeholder="Email" required><br>
                <input type="password" name="senha" placeholder="Senha" required><br>
                <button type="submit">Login</button>
            </form>
            <a href="#" onclick="openModal('cadastro')">Não tem uma conta? Cadastre-se aqui</a>
        </div>

        <!-- Modal Depósito (Vindo da Esquerda) -->
        <div id="modal-2" class="modal modal-2">
            <span class="close-btn" onclick="closeModal(2)">X</span>
            <h2>Depósito</h2>
            <p>Esse modal vem da esquerda.</p>
        </div>

        <!-- Modal Promoção (Vindo da Direita) -->
        <div id="modal-4" class="modal modal-4">
            
            <div class="header">
                <h2>Promoção</h2>
                <span class="close-btn" onclick="closeModal(4)">X</span>
            </div>
            <p>Esse modal vem da direita.</p>
        </div>

        <!-- Modal Fullscreen -->
        <div id="modal-fullscreen" class="modal fullscreen">
            <span class="close-btn" onclick="closeModal('fullscreen')">X</span>
            <h2>Modal Fullscreen</h2>
            <p>Este é um modal que ocupa a tela inteira.</p>
        </div>
    </div>
 
        <div id="content" class="content">
        <div class="carousel">    
            <div class="carousel-images">
                <img src="imagens/cashback.png" alt="cashback" class="img-carousel">
                <img src="imagens/afiliados.png" alt="afiliado" class="img-carousel">
                <img src="imagens/bonus100.png" alt="bonus100" class="img-carousel">
                <img src="imagens/bonus30.png" alt="bonus30" class="img-carousel">
                <img src="imagens/chuva-dinheiro.png" alt="chuva-de-dinheiro" class="img-carousel">
            </div>
            <button class="prev" onclick="moveCarousel(-1)">Anterior</button>
            <button class="next" onclick="moveCarousel(1)">Próxima</button>
        </div>

        <nav class="nav-sessao">
            <h2>Bem-vindo ao Cassino Online</h2>
            <p>O Cassino Online oferece uma ampla variedade de jogos para você aproveitar. Jogue caça-níqueis, jogos de mesa, jogos de cartas e muito mais.</p>     
            <h2>Cadastre-se e ganhe um bônus de boas-vindas</h2>
            <p>Cadastre-se no Cassino Online hoje e ganhe um bônus de boas-vindas de 100% até R$100.</p>           
        </nav>

        <aside>
            <div class="burcar">       
                <label for="input-buscar"></label>                   
                    <input type="text" class="input-buscar" id="input-buscar" name="input-buscar" placeholder="Procure Jogos">  
                    <img src="imagens/buscar.png" alt="buscar" id="img-buscar">    
            </div>

            <div class="div-but-pag">
                <button onclick="showSection(1)" class="but-pag">1</button>
                <button onclick="showSection(2)" class="but-pag">2</button>
                <button onclick="showSection(3)" class="but-pag">3</button>
                <button onclick="showSection(4)" class="but-pag">4</button>
                <button onclick="showSection(5)" class="but-pag">5</button>
            </div>
        </aside>

        <nav class="container-jogos">
            <section id="section1" class="active">
                <div class="div-img"><img src="imagens/all-cassinos/1.jpg" alt="Image 1" class="img-jogos">
                    <a href="https://gregorioponciano.github.io/layout/cassinos/jogos/fortune_tiger/index.html" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/2.jpg" alt="Image 2" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/3.jpg" alt="Image 3" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/fortune_dragon.jpg" alt="Image 4" class="img-jogos">
                    <a href="https://gregorioponciano.github.io/layout/cassinos/jogos/fortune_dragon/index.html" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/5.jpg" alt="Image 5" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/6.jpg" alt="Image 6" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/7.jpg" alt="Image 7" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/4.jpg" alt="Image 8" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/9.jpg" alt="Image 9" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
              </section>
              <section id="section2" style="display: none;">
                <div class="div-img"><img src="imagens/all-cassinos/10.jpg" alt="Image 10" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/11.jpg" alt="Image 11" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/12.jpg" alt="Image 12" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/13.jpg" alt="Image 13" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/14.jpg" alt="Image 14" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/15.jpg" alt="Image 15" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/16.jpg" alt="Image 16" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/17.jpg" alt="Image 17" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/18.jpg" alt="Image 18" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
              </section>
              <section id="section3" style="display: none;">
                <div class="div-img"><img src="imagens/all-cassinos/19.jpg" alt="Image 19" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/20.jpg" alt="Image 20" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/21.jpg" alt="Image 21" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/22.jpg" alt="Image 22" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/23.jpg" alt="Image 23" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/24.jpg" alt="Image 24" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/25.jpg" alt="Image 25" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/26.jpg" alt="Image 26" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/27.jpg" alt="Image 27" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
              </section>
              <section id="section4" style="display: none;">
                <div class="div-img"><img src="imagens/all-cassinos/28.jpg" alt="Image 28" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/29.jpg" alt="Image 29" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/30.jpg" alt="Image 30" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/31.jpg" alt="Image 31" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/32.jpg" alt="Image 32" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/33.jpg" alt="Image 33" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/34.jpg" alt="Image 34" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/35.jpg" alt="Image 35" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
                <div class="div-img"><img src="imagens/all-cassinos/36.jpg" alt="Image 36" class="img-jogos">
                    <a href="#" class="link-jogar">jogar</a>
                </div>
              </section>
          <section id="section5" style="display: none;">
            <div class="div-img"><img src="imagens/all-cassinos/37.jpg" alt="Image 37" class="img-jogos">
                <a href="#" class="link-jogar">jogar</a>
            </div>
            <div class="div-img"><img src="imagens/all-cassinos/38.jpg" alt="Image 38" class="img-jogos">
                <a href="#" class="link-jogar">jogar</a>
            </div>
            <div class="div-img"><img src="imagens/all-cassinos/39.jpg" alt="Image 39" class="img-jogos">
                <a href="#" class="link-jogar">jogar</a>
            </div>
            <div class="div-img"><img src="imagens/all-cassinos/40.jpg" alt="Image 40" class="img-jogos">
                <a href="#" class="link-jogar">jogar</a>
            </div>
            <div class="div-img"><img src="imagens/all-cassinos/41.jpg" alt="Image 41" class="img-jogos">
                <a href="#" class="link-jogar">jogar</a>
            </div>
            <div class="div-img"><img src="imagens/all-cassinos/42.jpg" alt="Image 42" class="img-jogos">
                <a href="#" class="link-jogar">jogar</a>
            </div>
            <div class="div-img"><img src="imagens/all-cassinos/43.jpg" alt="Image 43" class="img-jogos">
                <a href="#" class="link-jogar">jogar</a>
            </div>
            <div class="div-img"><img src="imagens/all-cassinos/44.jpg" alt="Image 44" class="img-jogos">
                <a href="#" class="link-jogar">jogar</a>
            </div>
            <div class="div-img"><img src="imagens/all-cassinos/45.jpg" alt="Image 45" class="img-jogos">
                <a href="#" class="link-jogar">jogar</a>
            </div>
          </section>
          <footer>
            <p class="p-footer">&copy;Copyright 2024 Cassino Online</p>
        </footer>
        </nav>
</div>
<br><br><br>


    <script src="script.js"></script>
    <script src="paginas.js"></script>
    <script src="slide.js"></script>

</body>
</html>
