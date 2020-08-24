import React, { useEffect, useState } from "react";
import "../styles/loading.scss";
import * as THREE from "three";
import { useRef } from "react";

interface Props {
  isLoaded: boolean;
}

const renderThree = () => {
  // サイズを指定
  const width = 960;
  const height = 540;
  // レンダラを作成
  const renderer: any = new THREE.WebGLRenderer({
    canvas: document.querySelector("#canvas") as HTMLCanvasElement,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  // シーンを作成
  const scene = new THREE.Scene();
  // フォグを設定
  // new THREE.Fog(色, 開始距離, 終点距離);
  scene.fog = new THREE.Fog(0x333333, 50, 3000);
  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(0, 0, 3000);

  // 形状データを作成
  const geometry = new THREE.Geometry();
  // 配置する範囲
  const SIZE = 3000;
  // 配置する個数
  const LENGTH = 800;
  for (let i = 0; i < LENGTH; i++) {
    geometry.vertices.push(
      new THREE.Vector3(
        SIZE * (Math.random() - 0.5),
        SIZE * (Math.random() - 0.5),
        SIZE * (Math.random() - 0.5)
      )
    );
  }

  for (let i = 1; i < 100; i++) {
    const geo1 = new THREE.CircleGeometry(i * 1, i * 1);
    const mat1 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 1 / i,
    });
    const mesh1 = new THREE.Mesh(geo1, mat1);
    mesh1.position.z = 0;
    scene.add(mesh1);
  }

  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  // シーンに追加
  scene.add(directionalLight);

  // マテリアルを作成
  const material = new THREE.PointsMaterial({
    // 一つ一つのサイズ
    size: 6,
    // 色
    color: 0xffffff,
  });

  const mesh = new THREE.Points(geometry, material);
  scene.add(mesh);
  let renderID: number;

  let time = 0;
  const timerID = setInterval(() => {
    time += 1;
    console.log(time);
  }, 1000);

  tick();

  // 毎フレーム時に実行されるループイベント
  function tick() {
    if (camera.position.z >= 100) {
      if (time < 3) {
        camera.position.z -= 10;
      } else {
        camera.position.z -= time * 5;
      }
    } else {
      const geo10 = new THREE.CircleGeometry(1000, 1000);
      const mat10 = new THREE.MeshBasicMaterial({
        color: 0xffffff,
      });
      const mesh10 = new THREE.Mesh(geo10, mat10);
      mesh10.position.z = 0;
      scene.add(mesh10);
    }
    renderer.render(scene, camera);
    // レンダリング
    renderID = requestAnimationFrame(tick);
  }

  setTimeout(() => {
    cancelAnimationFrame(renderID);
    clearTimeout(timerID);
  }, 5000);
};
const Loading: React.FC<Props> = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [intensity, setIntensity] = useState(1);
  const intensityRef = useRef(intensity);

  useEffect(() => {
    setIsLoaded(true);
    renderThree();
    // const timer = setInterval(() => {
    //   console.log(camera);
    //   setCamera(cameraRef.current + 500);
    // }, 300);
    // return () => {
    //   clearTimeout(timer);
    // };
  }, [props.isLoaded]);

  return (
    <div className="loading__wrapper">
      <canvas id="canvas" />
    </div>
  );
};

export default Loading;
